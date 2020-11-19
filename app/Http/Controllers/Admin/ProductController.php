<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class ProductController extends Controller
{
     public function index()
     {
          $products = Product::with('category')->with('subcategory')->paginate(50)->transform(function($product){
               return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'category' => $product->category->name,
                    'subcategory' => $product->subcategory->name,
                    'image' => ($product->image) ? route('show.image', 'products/'.$product->image) : null,
                    'status' => ($product->status) ? true : false,
                    'statusCaption' => ($product->status) ? 'Active' : 'Inactive',
               ];
          });
          return Inertia::render('Admin/Product/Index', ['data' => $products]);
     }

     public function create()
     {
          $categorie = Category::with(['subcategories' => function($subcategories){
               return $subcategories->where('status', true);
          }])->where('status', true)->get();
          $categories = array();
          foreach($categorie as $cats){
               $subs = array();
               foreach($cats->subcategories as $sub){
                    array_push($subs, [
                         'id' => $sub->id,
                         'name' => $sub->name
                    ]);
               }
               array_push($categories, [
                    'id' => $cats->id,
                    'name' => $cats->name,
                    'subs' => $subs
               ]);
          }
          return Inertia::render('Admin/Product/Create', ['data' => [
               'categories' => $categories
          ]]);
     }

     public function store(ProductRequest $request)
     {
          $mediaName = null;
          if($request->hasFile('image')){
               $mediaPath = $request->file('image')->store('products/');
               $index = count(explode('/', $mediaPath)) - 1;
               $mediaName = explode('/', $mediaPath)[$index];
          }

          $product = new Product;
          $product->category_id = $request->get('category');
          $product->subcategory_id = $request->get('subcategory');
          $product->name = $request->get('name');
          $product->description = $request->get('description');
          $product->image = $mediaName;
          $product->status = ($request->get('status') == 'true') ? true : false;
          $product->is_validate = ($request->get('validate') == 'true') ? true : false;
          $product->save();

          return redirect()->route('product.index')->with('success', 'Product saved successfully.');
     }

     public function show(Product $product)
     {
          $product = Product::with('category')->with('subcategory')->with(['configurations' => function($configurations){
               return $configurations->with('presentation')->with('agency');
          }])->find($product->id);

          $configurations = array();
          foreach($product->configurations as $config){
               array_push($configurations, [
                    'id' => $config->id,
                    'code' => $config->code,
                    'presentation' => $config->presentation->name,
                    'agency' => $config->agency->name,
                    'status' => ($config->status) ? true : false,
                    'statusCaption' => ($config->status) ? 'Active' : 'Inactive',
                    'transformable' => ($config->is_transformable) ? true : false,
                    'transformableCaption' => ($config->is_transformable) ? 'Yes' : 'No'
               ]);
          }
          return Inertia::render('Admin/Product/Show', ['data' => [
               'id' => $product->id,
               'name' => $product->name,
               'category' => $product->category->name,
               'subcategory' => $product->subcategory->name,
               'image' => ($product->image) ? route('show.image', 'products/'.$product->image) : null,
               'description' => $product->description,
               'status' => ($product->status) ? true : false,
               'statusCaption' => ($product->status) ? 'Active' : 'Inactive',
               'valid' => ($product->is_validate) ? true : false,
               'validCaption' => ($product->is_validate) ? 'Yes' : 'No',
               'configs' => $configurations
          ]]);
     }

     public function edit(Product $product)
     {
          $categorie = Category::with(['subcategories' => function($subcategories){
               return $subcategories->where('status', true);
          }])->where('status', true)->get();
          $categories = array();
          foreach($categorie as $cats){
               $subs = array();
               foreach($cats->subcategories as $sub){
                    array_push($subs, [
                         'id' => $sub->id,
                         'name' => $sub->name
                    ]);
               }
               array_push($categories, [
                    'id' => $cats->id,
                    'name' => $cats->name,
                    'subs' => $subs
               ]);
          }
          return Inertia::render('Admin/Product/Edit', ['data' => [
               'categories' => $categories,
               'id' => $product->id,
               'category' => $product->category_id,
               'subcategory' => $product->subcategory_id,
               'name' => $product->name,
               'description' => $product->description,
               'image' => ($product->image) ? route('show.image', 'products/'.$product->image) : null,
               'status' => ($product->status) ? true : false,
               'validate' => ($product->is_validate) ? true : false
          ]]);
     }

     public function update(ProductRequest $request, Product $product)
     {
          $mediaName = $product->image;
          if($request->hasFile('image')){
               $mediaPath = $request->file('image')->store('products/');
               $index = count(explode('/', $mediaPath)) - 1;
               $mediaName = explode('/', $mediaPath)[$index];
          }

          $product->category_id = $request->get('category');
          $product->subcategory_id = $request->get('subcategory');
          $product->name = $request->get('name');
          $product->description = $request->get('description');
          $product->image = $mediaName;
          $product->status = ($request->get('status') == 'true') ? true : false;
          $product->is_validate = ($request->get('validate') == 'true') ? true : false;
          $product->update();

          return redirect()->route('product.index')->with('success', 'Product updated successfully.');
     }
}
