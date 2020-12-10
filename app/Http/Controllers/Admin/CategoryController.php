<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
     public function index()
     {
          try {
               $categories = Category::paginate(50)->transform(function($category){
                    return [
                         'id' => $category->id,
                         'name' => $category->name,
                         'status' => ($category->status) ? true : false,
                         'statusCaption' => ($category->status) ? 'Active' : 'Inactive'
                    ];
               });
               return Inertia::render('Admin/Category/Index', ['data' => $categories]);
          } catch (\Exception $e) {
               Log::error('Category Index', ['data' => $e]);
          }
     }

     public function create()
     {
          try {
               return Inertia::render('Admin/Category/Create');
          } catch (\Exception $e) {
               Log::error('Category create', ['data' => $e]);
          }
     }

     public function store(CategoryRequest $request)
     {
          try {
               $category = new Category;
               $category->name = $request->get('name');
               $category->status = ($request->get('status') == 'true') ? true : false;
               $category->save();
               return redirect()->route('category.index')->with('success', 'Category saved successfully.');
          } catch (\Exception $e) {
               Log::error('Category store', ['data' => $e]);
          }
     }

     public function edit(Category $category)
     {
          try {
               return Inertia::render('Admin/Category/Edit', ['data' => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'status' => ($category->status) ? true : false
               ]]);
          } catch (\Exception $e) {
               Log::error('Category edit', ['data' => $e]);
          }
     }

     public function update(CategoryRequest $request, Category $category)
     {
          try {
               $category->name = $request->get('name');
               $category->status = ($request->get('status') == 'true') ? true : false;
               $category->update();
               return redirect()->route('category.index')->with('success', 'Category saved successfully.');
          } catch (\Exception $e) {
               Log::error('Category update', ['data' => $e]);
          }
     }
}
