<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SubcategoryRequest;
use App\Models\Category;
use App\Models\Subcategory;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class SubcategoryController extends Controller
{
     public function index(Category $category)
     {
          try {
               $subcategories = Subcategory::where('category_id', $category->id)->paginate(50)->transform(function($subcategorie){
                    return [
                         'id' => $subcategorie->id,
                         'name' => $subcategorie->name,
                         'status' => ($subcategorie->status) ? true : false,
                         'statusCaption' => ($subcategorie->status) ? 'Active' : 'Inactive'
                    ];
               });
               return Inertia::render('Admin/Category/Sub/Index', ['data' => [
                    'subs' => $subcategories,
                    'category' => [
                         'id' => $category->id,
                         'name' => $category->name,
                         'status' => ($category->status) ? true : false,
                         'statusCaption' => ($category->status) ? 'Active' : 'Inactive'
                    ]
               ]]);
          } catch (\Exception $e) {
               Log::error('Subcategory index', ['data' => $e]);
          }
     }

     public function create(Category $category)
     {
          try {
               return Inertia::render('Admin/Category/Sub/Create', ['data' => [
                    'category' => [
                         'id' => $category->id,
                         'name' => $category->name,
                         'status' => ($category->status) ? true : false,
                         'statusCaption' => ($category->status) ? 'Active' : 'Inactive'
                    ]
               ]]);
          } catch (\Exception $e) {
               Log::error('Subcategory create', ['data' => $e]);
          }
     }

     public function store(SubcategoryRequest $request, Category $category)
     {
          try {
               $subcategory = new Subcategory;
               $subcategory->category_id = $request->get('category');
               $subcategory->name = $request->get('name');
               $subcategory->status = ($request->get('status') == 'true') ? true : false;
               $subcategory->save();
               return redirect()->route('subcategory.index', $category->id)->with('success', 'Subcategory saved successfully.');
          } catch (\Exception $e) {
               Log::error('Subcategory store', ['data' => $e]);
          }
     }

     public function edit(Category $category, Subcategory $subcategory)
     {
          try {
               return Inertia::render('Admin/Category/Sub/Edit', ['data' => [
                    'category' => [
                         'id' => $category->id,
                         'name' => $category->name,
                         'status' => ($category->status) ? true : false,
                         'statusCaption' => ($category->status) ? 'Active' : 'Inactive'
                    ],
                    'sub' => [
                         'id' => $subcategory->id,
                         'category' => $subcategory->category_id,
                         'name' => $subcategory->name,
                         'status' => ($subcategory->status) ? true : false,
                    ]
               ]]);
          } catch (\Exception $e) {
               Log::error('Subcategory edit', ['data' => $e]);
          }
     }

     public function update(SubcategoryRequest $request, Category $category, Subcategory $subcategory)
     {
          try {
               $subcategory->name = $request->get('name');
               $subcategory->status = ($request->get('status') == 'true') ? true : false;
               $subcategory->update();
               return redirect()->route('subcategory.index', $category->id)->with('success', 'Subcategory updated successfully.');
          } catch (\Exception $e) {
               Log::error('Subcategory update', ['data' => $e]);
          }
     }
}
