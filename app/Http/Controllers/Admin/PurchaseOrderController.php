<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\PurchaseOrderRequest;
use App\Models\Store;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderDetails;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
     public function index(Store $store)
     {
          $purchases = PurchaseOrder::with('user')
               ->where('store_id', $store->id)
               ->paginate(50)->transform(function($purchase){
               return [
                    'id' => $purchase->id,
                    'code' => $purchase->code,
                    'user' => $purchase->user->name,
                    'merged' => ($purchase->merged_id) ? true : false,
                    'mergeCaption' => ($purchase->merged_id) ? 'Yes' : 'No',
                    'approved' => ($purchase->approved) ? true : false,
                    'approveCaption' => ($purchase->approved) ? 'Yes' : 'No',
                    'printed' => $purchase->printed,
                    'date' => $purchase->created_at->toDateTimeString()
               ];
          });
          return Inertia::render('Admin/Store/PurchaseOrder/Index', ['data' => [
               'store' => [
                    'id' => $store->id,
                    'name' => $store->name,
                    'code' => $store->code,
                    'type' => $store->type,
                    'logo' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null
               ],
               'purchases' => $purchases
          ]]);
     }

     public function create(Store $store)
     {
          return Inertia::render('Admin/Store/PurchaseOrder/Create', ['data' => [
               'store' => [
                    'id' => $store->id,
                    'name' => $store->name,
                    'code' => $store->code,
                    'type' => $store->type,
               ]
          ]]);
     }

     public function store(PurchaseOrderRequest $request, Store $store)
     {
          $products = collect($request->get('products'))->map(function($product){
               return [
                    'id' => $product['id'],
                    'quantity' => $product['qty']
               ];
          })->reject(function($product){
               return $product['quantity'] == 0;
          });

          if($products->count() > 0){
               DB::transaction(function() use ($store, $products, $request){
                    $code = PurchaseOrder::generateCode();
                    $purchase = new PurchaseOrder;
                    $purchase->code = $code;
                    $purchase->store_id = $store->id;
                    $purchase->user_id = auth()->user()->id;
                    $purchase->merged_id = null;
                    $purchase->approved = false;
                    $purchase->printed = 0;
                    $purchase->note = 'n/a';
                    $purchase->save();

                    foreach($products as $product){
                         $detail = new PurchaseOrderDetails;
                         $detail->purchase_order_id = $purchase->id;
                         $detail->product_configuration_id = $product['id'];
                         $detail->user_id = $request->user()->id;
                         $detail->quantity = $product['quantity'];
                         $detail->received = 0;
                         $detail->is_complete = false;
                         $detail->save();
                    }
               });
               return redirect()->route('purchase-order.index', $store->id)->with('success', 'Purchase Order created successfully.');
          }
          return redirect()->back()->with('error', 'Unable to create purchase order. No product was selected.');
     }

     public function show(Store $store, PurchaseOrder $purchase)
     {
          $store = Store::with(['contacts' => function($contacts){
               return $contacts->where('status', true);
          }])->find($store->id);
          $contacts = array();
          $purchase = PurchaseOrder::with('user')->with(['details' => function($details){
               return $details->with(['productinfo' => function($productinfo){
                    return $productinfo->with(['product' => function($product){
                         return $product->with('category')->with('subcategory');
                    }])->with('presentation')->with('agency');
               }]);
          }])->find($purchase->id);

          foreach($store->contacts as $contact){
               array_push($contacts, [
                    'type' => $contact->name,
                    'reference' => $contact->reference,
                    'link' => ($contact->link) ? $contact->link : '-',
               ]);
          }

          $details = array();
          foreach($purchase->details as $detail){
               array_push($details, [
                    'detail' => $detail->id,
                    'id' => $detail->productinfo->id,
                    'code' => $detail->productinfo->code,
                    'name' => $detail->productinfo->product->name.' '.$detail->productinfo->agency->name.' '.$detail->productinfo->presentation->name,
                    'qty' => $detail->quantity
               ]);
          }
          return Inertia::render('Admin/Store/PurchaseOrder/Show', ['data' => [
               'store' => [
                    'id' => $store->id,
                    'name' => $store->name,
                    'code' => $store->code,
                    'type' => $store->type,
                    'logo' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null,
                    'contacts' => $contacts
               ],
               'purchase' => [
                    'id' => $purchase->id,
                    'code' => $purchase->code,
                    'user' => $purchase->user->name,
                    'approved' => ($purchase->approved) ? true : false,
                    'created' => $purchase->created_at->toDateTimeString()
               ],
               'details' => $details
          ]]);
     }

     public function edit(Store $store, PurchaseOrder $purchase)
     {
          $purchase = PurchaseOrder::with(['details' => function($details){
               return $details->with(['productinfo' => function($productinfo){
                    return $productinfo->with(['product' => function($product){
                         return $product->with('category')->with('subcategory');
                    }])->with('presentation')->with('agency');
               }]);
          }])->find($purchase->id);

          $details = array();
          foreach($purchase->details as $detail){
               array_push($details, [
                    'detail' => $detail->id,
                    'id' => $detail->productinfo->id,
                    'code' => $detail->productinfo->code,
                    'name' => $detail->productinfo->product->name.' '.$detail->productinfo->agency->name.' '.$detail->productinfo->presentation->name,
                    'qty' => $detail->quantity,
                    'remove' => false,
                    'new' => false
               ]);
          }
          return Inertia::render('Admin/Store/PurchaseOrder/Edit', ['data' => [
               'store' => [
                    'id' => $store->id,
                    'name' => $store->name,
                    'code' => $store->code,
                    'type' => $store->type,
                    'logo' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null
               ],
               'purchase' => [
                    'id' => $purchase->id,
                    'code' => $purchase->code,
               ],
               'details' => $details
          ]]);
     }

     public function update(Request $request, Store $store, PurchaseOrder $purchase)
     {
          $products = collect($request->get('products'))->map(function($product){
               return [
                    'id' => $product['id'],
                    'detail' => $product['detail'],
                    'quantity' => $product['qty'],
                    'remove' => ($product['remove'] == 'true') ? true : false,
                    'new' => ($product['new'] == 'true') ? true : false,
               ];
          })->reject(function($product){
               return $product['quantity'] == 0;
          });

          if($products->count() > 0){
               DB::transaction(function() use ($purchase, $products, $request){
                    foreach($products as $product){
                         if($product['remove']){
                              $detail = PurchaseOrderDetails::find($product['detail']);
                              if($detail){
                                   $detail->delete();
                              }
                         }else{
                              if($product['new']){
                                   $detail = new PurchaseOrderDetails;
                              }else{
                                   $detail = PurchaseOrderDetails::find($product['detail']);
                              }
                              $detail->purchase_order_id = $purchase->id;
                              $detail->product_configuration_id = $product['id'];
                              $detail->user_id = $request->user()->id;
                              $detail->quantity = $product['quantity'];
                              $detail->received = 0;
                              $detail->is_complete = false;
                              if($product['new']){$detail->save();}else{$detail->update();};
                         }
                    }
               });
               return redirect()->route('purchase-order.index', $store->id)->with('success', 'Purchase Order updated successfully.');
          }
          return redirect()->back()->with('error', 'Unable to create purchase order. No product was selected.');
     }

     public function getApprove(Store $store, PurchaseOrder $purchase)
     {
          if($purchase->approved){
               return redirect()->back()->with('error', 'Purchase Order already approved.');
          }
          $store = Store::with(['contacts' => function($contacts){
               return $contacts->where('status', true);
          }])->find($store->id);
          $contacts = array();
          $purchase = PurchaseOrder::with('user')->with(['details' => function($details){
               return $details->with(['productinfo' => function($productinfo){
                    return $productinfo->with(['product' => function($product){
                         return $product->with('category')->with('subcategory');
                    }])->with('presentation')->with('agency');
               }]);
          }])->find($purchase->id);

          foreach($store->contacts as $contact){
               array_push($contacts, [
                    'type' => $contact->name,
                    'reference' => $contact->reference,
                    'link' => ($contact->link) ? $contact->link : '-',
               ]);
          }

          $details = array();
          foreach($purchase->details as $detail){
               array_push($details, [
                    'detail' => $detail->id,
                    'id' => $detail->productinfo->id,
                    'code' => $detail->productinfo->code,
                    'name' => $detail->productinfo->product->name.' '.$detail->productinfo->agency->name.' '.$detail->productinfo->presentation->name,
                    'qty' => $detail->quantity
               ]);
          }
          return Inertia::render('Admin/Store/PurchaseOrder/Approve', ['data' => [
               'store' => [
                    'id' => $store->id,
                    'name' => $store->name,
                    'code' => $store->code,
                    'type' => $store->type,
                    'logo' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null,
                    'contacts' => $contacts
               ],
               'purchase' => [
                    'id' => $purchase->id,
                    'code' => $purchase->code,
                    'user' => $purchase->user->name,
                    'created' => $purchase->created_at->toDateTimeString()
               ],
               'details' => $details
          ]]);
     }

     public function postApprove(Store $store, PurchaseOrder $purchase)
     {
          if($purchase->approved){
               return redirect()->route('purchase-order.index', $store->id)->with('error', 'Purchase Order already approved.');
          }
          $purchase->approved = true;
          $purchase->update();
          return redirect()->route('purchase-order.index', $store->id)->with('success', 'Purchase Order approved successfully.');
     }
}
