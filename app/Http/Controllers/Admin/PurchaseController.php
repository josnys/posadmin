<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\PurchaseRequest;
use App\Models\Purchase;
use App\Models\PurchaseDetail;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderDetails;
use App\Models\Store;
use App\Models\Supplier;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PurchaseController extends Controller
{
     public function index(Store $store)
     {
          try {
               $purchases = Purchase::with('user')->with('supplier')->where('store_id', $store->id)->paginate(50)->transform(function($purchase){
                    return [
                         'id' => $purchase->id,
                         'code' => $purchase->code,
                         'user' => $purchase->user->name,
                         'supplier' => $purchase->supplier->name,
                         'approved' => ($purchase->approved) ? true : false,
                         'approvedCaption' => ($purchase->approved) ? 'Yes' : 'No',
                         'date' => $purchase->created_at->toDateTimeString()
                    ];
               });
               return Inertia::render('Admin/Store/Purchase/Index', ['data' => [
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                    ],
                    'purchases' => $purchases
               ]]);
          } catch (\Exception $e) {
               Log::error('Purchase index', ['data' => $e]);
          }
     }

     public function create(Store $store, PurchaseOrder $order)
     {
          try {
               $order = PurchaseOrder::with('user')->with(['details' => function($details){
                    return $details->with(['productinfo' => function($productinfo){
                         return $productinfo->with(['product' => function($product){
                              return $product->with('category')->with('subcategory');
                         }])->with('presentation')->with('agency');
                    }]);
               }])->find($order->id);

               $_suppliers = Supplier::all();
               $suppliers = array();
               foreach($_suppliers as $supplier){
                    array_push($suppliers, [
                         'id' => $supplier->id,
                         'name' => $supplier->name
                    ]);
               }

               $details = array();
               foreach($order->details as $detail){
                    array_push($details, [
                         'detail' => $detail->id,
                         'id' => $detail->productinfo->id,
                         'name' => $detail->productinfo->code.' '.$detail->productinfo->product->name.' '.$detail->productinfo->agency->name.' '.$detail->productinfo->presentation->name,
                         'qty_order' => $detail->quantity,
                         'qty_recieve' => 0,
                         'cost' => 0,
                         'tax' => 0,
                         'total' => 0,
                    ]);
               }
               return Inertia::render('Admin/Store/Purchase/Create', ['data' => [
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                    ],
                    'purchase' => [
                         'id' => $order->id,
                         'code' => $order->code,
                         'user' => $order->user->name,
                         'approved' => ($order->approved) ? true : false,
                         'approveCaption' => ($order->approved) ? 'Yes' : 'No',
                         'date' => $order->created_at->toDateTimeString(),
                         'details' => $details,
                         'suppliers' => $suppliers
                    ]
               ]]);
          } catch (\Exception $e) {
               Log::error('Purchase create', ['data' => $e]);
          }
     }

     public function store(PurchaseRequest $request, Store $store, PurchaseOrder $order)
     {
          try {
               $products = collect($request->get('products'))->map(function($product){
                    return [
                         'details' => $product['detail'],
                         'id' => $product['id'],
                         'quantity' => $product['qty_recieve'],
                         'cost' => $product['cost'],
                         'tax' => $product['tax']
                    ];
               })->reject(function($product){
                    return $product['quantity'] == 0;
               });

               if($products->count() > 0){
                    if($order){
                         $purchase = new Purchase;
                         DB::transaction(function() use ($purchase, $store, $order, $products, $request){
                              // Add info to log
                              $purchase->code = $order->code;
                              $purchase->store_id = $store->id;
                              $purchase->user_id = auth()->user()->id;
                              $purchase->supplier_id = $request->get('supplier');
                              $purchase->receipt_no = $request->get('receipt');
                              $purchase->amount = (float)$request->get('subtotal');
                              $purchase->tax = (float)$request->get('tax');
                              $purchase->transport = (float)$request->get('transport');
                              $purchase->approved = false;
                              $purchase->is_stock = false;
                              $purchase->notes = ($request->get('note')) ? $request->get('note') : null;
                              $purchase->save();

                              foreach($products as $product){
                                   $orderDetail = PurchaseOrderDetails::where([
                                        'purchase_order_id' => $order->id,
                                        'product_configuration_id' => $product['id']
                                   ])->first();
                                   $detail = new PurchaseDetail;
                                   $detail->purchase_id = $purchase->id;
                                   $detail->user_id = auth()->user()->id;
                                   $detail->product_configuration_id = $product['id'];
                                   $detail->quantity = $product['quantity'];
                                   // $detail->qty_stock = (if prompt to move to stock)
                                   $detail->cost = $product['cost'];
                                   $detail->tax = $product['tax'];
                                   $detail->save();
                                   if($orderDetail){
                                        // Add info to log
                                        $orderDetail->received = $product['quantity'];
                                        $orderDetail->is_complete = ($orderDetail->quantity <= $product['quantity']) ? true : false;
                                        $orderDetail->update();
                                   }
                              }
                         });
                         $order->purchased = true;
                         $order->update();
                         return redirect()->route('purchase.show', [$store->id, $purchase->id])->with('success', 'Purchase created successfully.');
                    }
                    return redirect()->back()->with('error', 'Unable to create purchase. No Purchase Order found.');
               }
               return redirect()->back()->with('error', 'Unable to create purchase. Please verify quantity of products.');
          } catch (\Exception $e) {
               Log::error('Purchase store', ['data' => $e]);
          }
     }

     public function show(Store $store, Purchase $purchase)
     {
          try {
               $purchase = Purchase::with(['details' => function($details){
                    return $details->with(['productinfo' => function($productinfo){
                         return $productinfo->with('product')->with('presentation')->with('agency');
                    }])->with('user');
               }])->with('user')->with('store')->with('supplier')->find($purchase->id);

               $details = array();
               foreach($purchase->details as $detail){
                    array_push($details, [
                         'product' => "{$detail->productinfo->code} {$detail->productinfo->product->name} {$detail->productinfo->agency->name}  {$detail->productinfo->presentation->name}",
                         'quantity' => $detail->quantity,
                         'cost' => $detail->cost,
                         'tax' => $detail->tax,
                         'total' => ($detail->cost + $detail->tax) * $detail->quantity
                    ]);
               }

               $store = Store::with(['contacts' => function($contacts){
                    return $contacts->where('status', true);
               }])->find($store->id);
               $contacts = array();
               foreach($store->contacts as $contact){
                    array_push($contacts, [
                         'type' => $contact->name,
                         'reference' => $contact->reference,
                         'link' => ($contact->link) ? $contact->link : '-',
                    ]);
               }

               return Inertia::render('Admin/Store/Purchase/Show', ['data' => [
                    'id' => $purchase->id,
                    'code' => $purchase->code,
                    'barcode' => $purchase->barcode,
                    'user' => $purchase->user->name,
                    'supplier' => $purchase->supplier->name,
                    'reciept' => $purchase->receipt_no,
                    'amount' => $purchase->amount,
                    'tax' => $purchase->tax,
                    'transport' => $purchase->transport,
                    'total' => $purchase->total,
                    'date' => $purchase->created_at->toDateTimeString(),
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                         'code' => $store->code,
                         'type' => $store->type,
                         'logo' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null,
                         'contacts' => $contacts
                    ],
                    'details' => $details
               ]]);
          } catch (\Exception $e) {
               Log::error('Purchase show', ['data' => $e]);
          }
     }

     public function edit(Store $store, Purchase $purchase)
     {
          try {
               $_suppliers = Supplier::all();
               $suppliers = array();
               foreach($_suppliers as $supplier){
                    array_push($suppliers, [
                         'id' => $supplier->id,
                         'name' => $supplier->name
                    ]);
               }
               $purchase = Purchase::with(['details' => function($details){
                    return $details->with(['productinfo' => function($productinfo){
                         return $productinfo->with('product')->with('presentation')->with('agency');
                    }])->with('user');
               }])->with('user')->with('store')->with('supplier')->find($purchase->id);

               $details = array();
               foreach($purchase->details as $detail){
                    array_push($details, [
                         'detail' => $detail->id,
                         'id' => $detail->productinfo->id,
                         'name' => "{$detail->productinfo->code} {$detail->productinfo->product->name} {$detail->productinfo->agency->name}  {$detail->productinfo->presentation->name}",
                         'qty_recieve' => $detail->quantity,
                         'cost' => $detail->cost,
                         'tax' => $detail->tax,
                         'total' => ($detail->cost + $detail->tax) * $detail->quantity
                    ]);
               }
               return Inertia::render('Admin/Store/Purchase/Edit', ['data' => [
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                    ],
                    'purchase' => [
                         'id' => $purchase->id,
                         'code' => $purchase->code,
                         'receipt' => $purchase->receipt_no,
                         'user' => $purchase->user->name,
                         'supplier' => $purchase->supplier->id,
                         'subtotal' => $purchase->amount,
                         'tax' => $purchase->tax,
                         'transport' => $purchase->transport,
                         'total' => $purchase->total,
                         'date' => $purchase->created_at->toDateTimeString(),
                         'details' => $details,
                         'suppliers' => $suppliers
                    ]
               ]]);
          } catch (\Exception $e) {
               Log::error('Purchase edit', ['data' => $e]);
          }
     }

     public function update(PurchaseRequest $request, Store $store, Purchase $purchase)
     {
          try {
               $products = collect($request->get('products'))->map(function($product){
                    return [
                         'details' => $product['detail'],
                         'id' => $product['id'],
                         'quantity' => $product['qty_recieve'],
                         'cost' => $product['cost'],
                         'tax' => $product['tax']
                    ];
               });

               if($products->count() > 0){
                    if($purchase){
                         DB::transaction(function() use ($purchase, $store, $products, $request){
                              // Add info to log
                              $purchase->supplier_id = $request->get('supplier');
                              $purchase->receipt_no = $request->get('receipt');
                              $purchase->amount = (float)$request->get('subtotal');
                              $purchase->tax = (float)$request->get('tax');
                              $purchase->transport = (float)$request->get('transport');
                              $purchase->approved = false;
                              $purchase->is_stock = false;
                              $purchase->notes = ($request->get('note')) ? $request->get('note') : null;
                              $purchase->update();

                              foreach($products as $product){
                                   $detail = PurchaseDetail::where([
                                        'purchase_id' => $purchase->id,
                                        'product_configuration_id' => $product['id']
                                   ])->first();
                                   if($detail){
                                        if($product['quantity'] == 0){
                                             $detail->delete();
                                        }else{
                                             $detail->quantity = $product['quantity'];
                                             $detail->quantity = $product['quantity'];
                                             // $detail->qty_stock = (if prompt to move to stock)
                                             $detail->cost = $product['cost'];
                                             $detail->tax = $product['tax'];
                                             $detail->update();
                                        }
                                   }
                              }
                         });
                         return redirect()->route('purchase.show', [$store->id, $purchase->id])->with('success', 'Purchase updated successfully.');
                    }
                    return redirect()->back()->with('error', 'Unable to create purchase. No Purchase Order found.');
               }
               return redirect()->back()->with('error', 'Unable to update purchase. Please verify quantity of products.');
          } catch (\Exception $e) {
               Log::error('Purchase update', ['data' => $e]);
          }
     }
}
