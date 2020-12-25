<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\InventoryRequest;
use App\Models\Inventory;
use App\Models\Stock;
use App\Models\StockDetail;
use App\Models\Store;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class InventoryController extends Controller
{
     public function index(Request $request, Store $store)
     {
          try {
               $inventories = Inventory::with(['productinfo' => function($productinfo){
                    return $productinfo->with('product')->with('presentation')->with('agency');
               }])->where('store_id', $store->id)->paginate(75)->transform(function($inventory){
                    return [
                         'id' => $inventory->id,
                         'product' => "{$inventory->productinfo->code} {$inventory->productinfo->product->name} {$inventory->productinfo->agency->name}  {$inventory->productinfo->presentation->name}",
                         // 'qty_init' => $inventory->qty_initial,
                         'qty_available' => $inventory->quantity,
                         'qty_sold' => ($inventory->qty_initial - $inventory->quantity),
                         'expiration' => $inventory->expiration,
                         'lot' => $inventory->num_lot,
                         'price' => $inventory->price,
                         'discount' => $inventory->discount
                    ];
               });
               return Inertia::render('Admin/Store/Inventory/Index', ['data' => [
                    'store' => [
                         'id' => $store->id,
                         'name' => $store->name,
                    ],
                    'inventory' => $inventories
               ]]);
          } catch (\Exception $e) {
               Log::error('Inventory index', ['data' => $e]);
          }
     }

     public function store(InventoryRequest $request, Store $store)
     {
          try {
               $detail = StockDetail::with('stock')->find($request->get('stock'));
               // dd($detail);
               if(!$detail){
                    return redirect()->back()->with('error', 'Product not found in Stock.');
               }
               if($detail->stock->store_id != $store->id){
                    return redirect()->back()->with('error', 'This product seems not to be in the store at all.');
               }
               DB::transaction(function() use ($request, $store, &$detail){
                    $inventory = new Inventory;
                    $inventory->store_id = $store->id;
                    $inventory->stock_detail_id = $detail->id;
                    $inventory->user_id = auth()->user()->id;
                    $inventory->product_configuration_id = $detail->product_configuration_id;
                    $inventory->qty_initial = $request->get('quantity');
                    $inventory->quantity = $request->get('quantity');
                    $inventory->expiration = $detail->expiration;
                    $inventory->num_lot = $detail->num_lot;
                    $inventory->cost = $detail->cost;
                    $inventory->price = $detail->price;
                    $inventory->discount = 0;
                    $inventory->transformable = false;
                    $inventory->save();
                    // korije "qty_inventary" to "qty_inventory"
                    $detail->qty_inventary = $detail->qty_inventary + $request->get('quantity');
                    $detail->update();
               });

               return response()->json([
                    'qty_inv' => $detail->qty_inventary,
                    'qty_available' => ($detail->quantity - $detail->qty_inventary),
               ], 201);

               // return redirect()->route('stock.items', $store->id)->with('success', 'Product added successfully to inventory.');
          } catch (\Exception $e) {
               Log::error('Inventory store', ['data' => $e]);
          }
     }
}
