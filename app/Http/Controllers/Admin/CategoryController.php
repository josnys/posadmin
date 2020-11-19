<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
     public function index()
     {
          $categories = Category::paginate(50)->transform(function($category){
               return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'status' => ($category->status) ? true : false,
                    'statusCaption' => ($category->status) ? 'Active' : 'Inactive'
               ];
          });
          return Inertia::render('Admin/Category/Index', ['data' => $categories]);
     }

     public function create()
     {
          return Inertia::render('Admin/Category/Create');
     }

     public function store(CategoryRequest $request)
     {
          $category = new Category;
          $category->name = $request->get('name');
          $category->status = ($request->get('status') == 'true') ? true : false;
          $category->save();
          return redirect()->route('category.index')->with('success', 'Category saved successfully.');
     }

     public function edit(Category $category)
     {
          return Inertia::render('Admin/Category/Edit', ['data' => [
               'id' => $category->id,
               'name' => $category->name,
               'status' => ($category->status) ? true : false
          ]]);
     }

     public function update(CategoryRequest $request, Category $category)
     {
          $category->name = $request->get('name');
          $category->status = ($request->get('status') == 'true') ? true : false;
          $category->update();
          return redirect()->route('category.index')->with('success', 'Category saved successfully.');
     }
}
