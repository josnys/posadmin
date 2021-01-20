<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Requests\StockRequest;
use App\Models\Store;
use App\Models\Purchase;
use App\Models\Stock;
use App\Models\StockDetail;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class StockController extends Controller
{
     public function index(Store $store)
     {
          try {
               $stocks = Stock::with(['user' => function($user){
                    return $user->with('person');
               }])->with('details')->where('store_id', $store->id)->paginate(20)->transform(function($stock){
                    return [
                         'id' => $stock->id,
                         'code' => $stock->code,
                         'user' => $stock->user->person->name,
                         'items' => $stock->details->count(),
                         'approved' => ($stock->approved) ? true : false,
                         'approvedCaption' => ($stock->approved) ? 'Yes' : 'No',
                         'date' => $stock->created_at->toDateTimeString()
                    ];
               });
               return Inertia::render('Admin/Store/Stock/Index', ['data' => [
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                    ],
                    'stocks' => $stocks
               ]]);
          } catch (\Exception $e) {
               Log::error('Stock index', ['data' => $e]);
          }
     }

     public function create(Store $store, Purchase $purchase)
     {
          try {
               $purchase = Purchase::with(['details' => function($details){
                    return $details->with(['productinfo' => function($productinfo){
                         return $productinfo->with('product')->with('presentation')->with('agency');
                    }])->with('user');
               }])->find($purchase->id);

               $details = array();
               foreach($purchase->details as $detail){
                    array_push($details, [
                         'id' => $detail->product_configuration_id,
                         'product' => "{$detail->productinfo->code} {$detail->productinfo->product->name} {$detail->productinfo->agency->name}  {$detail->productinfo->presentation->name}",
                         'quantity' => $detail->quantity,
                         'qty_init' => $detail->quantity,
                         'qty_transfer' => 0,
                         'qty_comfirm' => $detail->quantity,
                         'expiration' => '',
                         'lot' => '',
                         'cost' => ($detail->cost + $detail->tax),
                         'price' => 0,
                         'duplicate' => true,
                         'remove' => false,
                         'reference' => -1,
                         'message' => ''
                    ]);
               }
               return Inertia::render('Admin/Store/Stock/Create', ['data' => [
                    'id' => $purchase->id,
                    'code' => $purchase->code,
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                    ],
                    'details' => $details
               ]]);
          } catch (\Exception $e) {
               Log::error('Stock create', ['data' => $e]);
          }
     }

     public function store(StockRequest $request, Store $store, Purchase $purchase)
     {
          try {
               $products = collect($request->get('products'))->map(function($product){
                    return [
                         'id' => $product['id'],
                         'quantity' => $product['qty_comfirm'],
                         'expiration' => $product['expiration'],
                         'lot' => $product['lot'],
                         'cost' => $product['cost'],
                         'price' => $product['price']
                    ];
               })->reject(function($product){
                    return $product['quantity'] == 0;
               });
               $stock = null;
               if($products->count() > 0){
                    DB::transaction(function() use ($store, $products, $request, $purchase, &$stock){
                         // Add info to log
                         if(!$purchase){
                              return redirect()->back()->with('error', 'The purchase is not found.');
                         }
                         $stock = new Stock;
                         $stock->purchase_id = $purchase->id;
                         $stock->store_id = $store->id;
                         $stock->user_id = auth()->user()->id;
                         $stock->code = $purchase->code;
                         $stock->approved = false;
                         $stock->notes = ($request->get('note')) ? $request->get('note') : null;
                         $stock->save();

                         foreach($products as $product){
                              $detail = new StockDetail;
                              $detail->stock_id = $stock->id;
                              $detail->product_configuration_id = $product['id'];
                              $detail->expiration = $product['expiration'];
                              $detail->num_lot = $product['lot'];
                              $detail->quantity = $product['quantity'];
                              $detail->qty_inventary = 0;
                              $detail->cost = $product['cost'];
                              $detail->price = $product['price'];
                              $detail->save();
                         }
                    });
                    $purchase->is_stock = true;
                    $purchase->update();
                    return redirect()->route('stock.show', [$store->id, $stock->id])->with('success', 'Stock added successfully.');
               }
               return redirect()->back()->with('error', 'Unable to add to stock. Please verify quantity of products.');
          } catch (\Exception $e) {
               Log::error('Stock store', ['data' => $e]);
          }
     }

     public function show(Store $store, Stock $stock)
     {
          try {
               $stock = Stock::with(['details' => function($details){
                    return $details->with(['productinfo' => function($productinfo){
                         return $productinfo->with('product')->with('presentation')->with('agency');
                    }]);
               }])->with(['user' => function($user){
                    return $user->with('person');
               }])->find($stock->id);

               $details = array();
               foreach($stock->details as $detail){
                    array_push($details, [
                         'product' => "{$detail->productinfo->code} {$detail->productinfo->product->name} {$detail->productinfo->agency->name}  {$detail->productinfo->presentation->name}",
                         'quantity' => $detail->quantity,
                         'qty_inv' => $detail->qty_inventary,
                         'expiration' => $detail->expiration,
                         'lot' => $detail->num_lot,
                         'cost' => $detail->cost,
                         'price' => $detail->price
                    ]);
               }
               return Inertia::render('Admin/Store/Stock/Show', ['data' => [
                    'id' => $stock->id,
                    'code' => $stock->code,
                    'user' => $stock->user->person->name,
                    'date' => $stock->created_at->toDateTimeString(),
                    'approved' => ($stock->approved) ? true : false,
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                    ],
                    'details' => $details
               ]]);
          } catch (\Exception $e) {
               Log::error('Stock show', ['data' => $e]);
          }
     }

     public function items(Store $store)
     {
          try {
               $stockIds = Stock::where(['store_id' => $store->id, 'approved' => true])->get()->pluck('id')->toArray();
               $details = StockDetail::with(['productinfo' => function($productinfo){
                    return $productinfo->with('product')->with('presentation')->with('agency');
               }])->whereIn('stock_id', $stockIds)->orderDESC()->get();
               $data = array();
               foreach($details as $detail){
                    $available = ($detail->quantity - $detail->qty_inventary);
                    array_push($data, [
                         'id' => $detail->id,
                         'product' => "{$detail->productinfo->code} {$detail->productinfo->product->name} {$detail->productinfo->agency->name}  {$detail->productinfo->presentation->name}",
                         'quantity' => $detail->quantity,
                         'qty_inv' => $detail->qty_inventary,
                         'qty_available' => $available,
                         'qty_send' => '',
                         'expiration' => $detail->expiration,
                         'lot' => $detail->num_lot,
                         'cost' => $detail->cost,
                         'price' => $detail->price,
                         'message' => ''
                    ]);
               }
               return Inertia::render('Admin/Store/Stock/Item', ['data' => [
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                    ],
                    'details' => $data
               ]]);
          } catch (\Exception $e) {
               Log::error('Stock items', ['data' => $e]);
          }
     }

     public function edit(Store $store, Stock $stock)
     {
          try {
               $stock = Stock::with(['details' => function($details){
                    return $details->with(['productinfo' => function($productinfo){
                         return $productinfo->with('product')->with('presentation')->with('agency');
                    }]);
               }])->with('user')->find($stock->id);

               $details = array();
               $products = array();
               $quantity = array();
               foreach($stock->details as $detail){
                    $reference = -1;
                    if(!in_array($detail->product_configuration_id, $products)){
                         array_push($products, $detail->product_configuration_id);
                         array_push($quantity, $detail->quantity);
                    }else{
                         $reference = array_search($detail->product_configuration_id, $products);
                         $quantity[$reference] += $detail->quantity;
                         $details[$reference]['qty_init'] = $quantity[$reference];
                         $details[$reference]['qty_transfer'] += $detail->quantity;
                    }
                    array_push($details, [
                         'code' => $detail->id,
                         'id' => $detail->product_configuration_id,
                         'product' => "{$detail->productinfo->code} {$detail->productinfo->product->name} {$detail->productinfo->agency->name}  {$detail->productinfo->presentation->name}",
                         'quantity' => $detail->quantity,
                         'qty_comfirm' => $detail->quantity,
                         'qty_init' => 0,
                         'qty_transfer' => 0,
                         'expiration' => $detail->expiration,
                         'lot' => $detail->num_lot,
                         'cost' => $detail->cost,
                         'price' => $detail->price,
                         'duplicate' => ($reference == -1) ? true : false,
                         'remove' => ($reference == -1) ? false : true,
                         'removed' => false,
                         'newLine' => false,
                         'reference' => $reference,
                         'message' => ''
                    ]);
               }
               return Inertia::render('Admin/Store/Stock/Edit', ['data' => [
                    'id' => $stock->id,
                    'code' => $stock->code,
                    'user' => $stock->user->name,
                    'date' => $stock->created_at->toDateTimeString(),
                    'approved' => ($stock->approved) ? true : false,
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                    ],
                    'details' => $details
               ]]);
          } catch (\Exception $e) {
               Log::error('Stock edit', ['data' => $e]);
          }
     }

     public function update(StockRequest $request, Store $store, Stock $stock)
     {
          try {
               $products = collect($request->get('products'))->map(function($product){
                    return [
                         'id' => $product['id'],
                         'code' => $product['code'],
                         'quantity' => $product['qty_comfirm'],
                         'expiration' => $product['expiration'],
                         'lot' => $product['lot'],
                         'cost' => $product['cost'],
                         'price' => $product['price'],
                         'removed' => ($product['removed'] == 'true') ? true : false,
                         'newLine' => ($product['newLine'] == 'true') ? true : false,
                    ];
               })->reject(function($product){
                    return $product['quantity'] == 0;
               });
               $stockId = null;
               if($products->count() > 0){
                    DB::transaction(function() use ($store, $products, $request, $stock){
                         // Add info to log

                         foreach($products as $product){
                              $detail = ($product['code'] == 0) ? new StockDetail : StockDetail::find($product['code']);
                              if($product['removed']){
                                   $detail->delete();
                              }else{
                                   $detail->stock_id = $stock->id;
                                   $detail->product_configuration_id = $product['id'];
                                   $detail->expiration = $product['expiration'];
                                   $detail->num_lot = $product['lot'];
                                   $detail->quantity = $product['quantity'];
                                   $detail->qty_inventary = 0;
                                   $detail->cost = $product['cost'];
                                   $detail->price = $product['price'];
                                   if($product['newLine']){
                                        $detail->save();
                                   }else{
                                        $detail->update();
                                   }
                              }
                         }
                    });
                    return redirect()->route('stock.show', [$store->id, $stock->id])->with('success', 'Stock updated successfully.');
               }
               return redirect()->back()->with('error', 'Unable to update stock. Please verify quantity of products.');
          } catch (\Exception $e) {
               Log::error('Stock update', ['data' => $e]);
          }
     }

     public function getApprove(Store $store, Stock $stock)
     {
          try {
               if($stock->approved){
                    return redirect()->back()->with('error', 'Stock already approved.');
               }
               $stock = Stock::with(['details' => function($details){
                    return $details->with(['productinfo' => function($productinfo){
                         return $productinfo->with('product')->with('presentation')->with('agency');
                    }]);
               }])->with('user')->find($stock->id);

               $details = array();
               foreach($stock->details as $detail){
                    array_push($details, [
                         'product' => "{$detail->productinfo->code} {$detail->productinfo->product->name} {$detail->productinfo->agency->name}  {$detail->productinfo->presentation->name}",
                         'quantity' => $detail->quantity,
                         'qty_inv' => $detail->qty_inventary,
                         'expiration' => $detail->expiration,
                         'lot' => $detail->num_lot,
                         'cost' => $detail->cost,
                         'price' => $detail->price
                    ]);
               }
               return Inertia::render('Admin/Store/Stock/Approve', ['data' => [
                    'id' => $stock->id,
                    'code' => $stock->code,
                    'user' => $stock->user->name,
                    'date' => $stock->created_at->toDateTimeString(),
                    'approved' => ($stock->approved) ? true : false,
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                    ],
                    'details' => $details
               ]]);
          } catch (\Exception $e) {
               Log::error('Stock get Approve', ['data' => $e]);
          }
     }

     public function postApprove(Store $store, Stock $stock)
     {
          try {
               if($stock->approved){
                    return redirect()->route('stock.index', $store->id)->with('error', 'Stock already approved.');
               }
               $stock->approved = true;
               $stock->update();
               return redirect()->route('stock.index', $store->id)->with('success', 'Stock approved successfully.');
          } catch (\Exception $e) {
               Log::error('Stock post approve', ['data' => $e]);
          }
     }
}
