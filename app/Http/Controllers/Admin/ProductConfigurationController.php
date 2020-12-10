<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ProductConfigurationRequest;
use App\Models\Presentation;
use App\Models\Agency;
use App\Models\Product;
use App\Models\ProductConfiguration;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProductConfigurationController extends Controller
{
     public function index(Product $product)
     {
          try {
               $product = Product::with('category')->with('subcategory')->with(['configurations' => function($configurations){
                    return $configurations->with('presentation')->with('agency');
               }])->find($product->id);
               $config = array();
               foreach($product->configurations as $data){
                    array_push($config, [
                         'id' => $data->id,
                         'presentation' => $data->presentation->name,
                         'agency' => $data->agency->name,
                         'code' => $data->code,
                         'status' => ($data->status) ? true : false,
                         'statusCaption' => ($data->status) ? 'Active' : 'Inactive',
                         'transformable' => ($data->is_transformable) ? true : false,
                         'transformableCaption' => ($data->is_transformable) ? 'Yes' : 'No'
                    ]);
               }
               return Inertia::render('Admin/Product/Config/Index', ['data' => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'category' => $product->category->name,
                    'subcategory' => $product->subcategory->name,
                    'image' => ($product->image) ? route('show.image', 'products/'.$product->image) : null,
                    'config' => $config
               ]]);
          } catch (\Exception $e) {
               Log::error('ProductConfiguration index', ['data' => $e]);
          }
     }

     public function create(Product $product)
     {
          try {
               $pres = Presentation::where('status', true)->get();
               $ages = Agency::where('status', true)->get();
               $presentations = array();
               $agencies = array();
               foreach($pres as $p){
                    array_push($presentations, ['id' => $p->id, 'name' => $p->name]);
               }
               foreach($ages as $a){
                    array_push($agencies, ['id' => $a->id, 'name' => $a->name]);
               }
               return Inertia::render('Admin/Product/Config/Create', ['data' => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'category' => $product->category->name,
                    'subcategory' => $product->subcategory->name,
                    'image' => ($product->image) ? route('show.image', 'products/'.$product->image) : null,
                    'presentations' => $presentations,
                    'agencies' => $agencies
               ]]);
          } catch (\Exception $e) {
               Log::error('ProductConfiguration create', ['data' => $e]);
          }
     }

     public function store(ProductConfigurationRequest $request, Product $product)
     {
          try {
               $config = new ProductConfiguration;
               $config->product_id = $product->id;
               $config->presentation_id = $request->get('presentation');
               $config->agency_id = $request->get('agency');
               $config->code = $request->get('code');
               $config->is_transformable = ($request->get('transformable') == 'true') ? true : false;
               $config->status = ($request->get('status') == 'true') ? true : false;
               $config->save();

               return redirect()->route('product.config.index', $product->id)->with('success', 'Configuration saved successfully');
          } catch (\Exception $e) {
               Log::error('ProductConfiguration store', ['data' => $e]);
          }
     }

     public function edit(Product $product, ProductConfiguration $config)
     {
          try {
               $pres = Presentation::where('status', true)->get();
               $ages = Agency::where('status', true)->get();
               $presentations = array();
               $agencies = array();
               foreach($pres as $p){
                    array_push($presentations, ['id' => $p->id, 'name' => $p->name]);
               }
               foreach($ages as $a){
                    array_push($agencies, ['id' => $a->id, 'name' => $a->name]);
               }
               return Inertia::render('Admin/Product/Config/Edit', ['data' => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'category' => $product->category->name,
                    'subcategory' => $product->subcategory->name,
                    'image' => ($product->image) ? route('show.image', 'products/'.$product->image) : null,
                    'presentations' => $presentations,
                    'agencies' => $agencies,
                    'config' => [
                         'id' => $config->id,
                         'agency' => $config->agency_id,
                         'presentation' => $config->presentation_id,
                         'code' => $config->code,
                         'status' => ($config->status) ? true : false,
                         'transformable' => ($config->is_transformable) ? true : false
                    ]
               ]]);
          } catch (\Exception $e) {
               Log::error('ProductConfiguration edit', ['data' => $e]);
          }
     }

     public function update(ProductConfigurationRequest $request, Product $product, ProductConfiguration $config)
     {
          try {
               if($request->get('code') != $config->code){
                    $request->validate(['code' => ['required', 'alpha_dash', 'unique:product_configurations,code']]);
               }
               $config->presentation_id = $request->get('presentation');
               $config->agency_id = $request->get('agency');
               $config->code = $request->get('code');
               $config->is_transformable = ($request->get('transformable') == 'true') ? true : false;
               $config->status = ($request->get('status') == 'true') ? true : false;
               $config->save();

               return redirect()->route('product.config.index', $product->id)->with('success', 'Configuration updated successfully');
          } catch (\Exception $e) {
               Log::error('ProductConfiguration update', ['data' => $e]);
          }
     }

     public function search(Request $request)
     {
          try {
               $request->validate(['search' => ['required', 'string']]);
               $products = Product::with(['configurations' => function($configurations){
                    return $configurations->with('presentation')->with('agency')->active();
               }])->active()->where('name', 'like', "%{$request->get('search')}%")->get();
               $data = array();
               if($products->count() > 0){
                    foreach($products as $product){
                         foreach($product->configurations as $config){
                              array_push($data, [
                                   'id' => $config->id,
                                   'code' => $config->code,
                                   'name' => "{$product->name} {$config->agency->name} {$config->presentation->name}"
                              ]);
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
                         foreach($productConfigs as $config){
                              array_push($data, [
                                   'id' => $config->id,
                                   'code' => $config->code,
                                   'name' => "{$config->product->name} {$config->agency->name} {$config->presentation->name}"
                              ]);
                         }
                    }
               }

               return response()->json([
                    'data' => $data
               ], 200);
          } catch (\Exception $e) {
               Log::error('ProductConfiguration search', ['data' => $e]);
          }
     }
}
