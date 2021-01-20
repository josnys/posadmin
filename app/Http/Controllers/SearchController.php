<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductConfiguration;
use App\Models\Product;
use App\Models\Inventory;
use App\Models\Store;
use App\Models\Person;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{
     public function product(Request $request, Store $store)
     {
          try {
               $request->validate(['search' => ['required', 'string']]);
               $products = Product::with(['configurations' => function($configurations){
                    return $configurations->with('presentation')->with('agency');
               }])->where('name', 'like', "%{$request->get('search')}%")->get();
               $data = array();
               $configIds = array();
               if($products->count() > 0){
                    foreach($products as $product){
                         foreach($product->configurations as $config){
                              array_push($configIds, $config->id);
                         }
                    }
               }else{
                    $productConfigs = ProductConfiguration::with(['product' => function($product){
                         return $product->active();
                    }])->with('presentation')
                         ->with('agency')
                         ->active()
                         ->where('code', 'like', "%{$request->get('search')}%")->get();
                    if($productConfigs->count() > 0){
                         $configIds = $productConfigs->pluck('id')->toArray();
                    }
               }

               if(count($configIds) > 0){
                    $inventories =  Inventory::with(['productinfo' => function($productinfo){
                         return $productinfo->with('product')->with('presentation')->with('agency');
                    }])->where('store_id', $store->id)->exist()->whereIn('product_configuration_id', $configIds)->get();
                    if($inventories->count() > 0){
                         foreach($inventories as $inventory){
                              array_push($data, [
                                   'inventory_code' => $inventory->id,
                                   'product_id' => $inventory->productinfo->id,
                                   'name' => "{$inventory->productinfo->product->name} {$inventory->productinfo->agency->name} {$inventory->productinfo->presentation->name}",
                                   'qty_available' => $inventory->quantity,
                                   'quantity' => 1,
                                   'lot' => $inventory->num_lot,
                                   'price' => $inventory->price,
                                   'tax' =>  0,
                                   'discount' => $inventory->discount,
                              ]);
                         }
                    }
               }

               return response()->json([
                    'message' => (count($data) == 0) ? 'Product not found.' : null,
                    'data' => $data
               ], 200);
          } catch (\Exception $e) {
               Log::error('Search product', ['data' => $e]);
          }
     }

     public function customer(Request $request, Store $store)
     {
          try {
               $request->validate(['search' => ['required', 'string']]);
               $search = $request->get('search');
               $customers = array();
               $people = Person::with('customer')
                    ->where('firstname', 'like', "%$search%")
                    ->orWhere('lastname', 'like', "%$search%")
                    ->orWhere('code', $search)->get();
               if($people->count() > 0){
                    foreach($people as $person){
                         if($person->customer){
                              array_push($customers, [
                                   'id' => $person->customer->id,
                                   'name' => $person->name,
                                   'code' => $person->code,
                                   'discount' => $person->customer->discount,
                                   'credit' => $person->customer->credit,
                                   'debit' => $person->customer->debit,
                              ]);
                         }
                    }
               }
               return response()->json([
                    'message' => (count($customers) == 0) ? 'Customer not found.' : null,
                    'data' => $customers
               ], 200);
          } catch (\Exception $e) {
               Log::error('Search Client', ['data' => $e]);
          }
     }
}
