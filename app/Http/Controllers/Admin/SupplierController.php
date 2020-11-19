<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SupplierRequest;
use App\Models\Supplier;
use Inertia\Inertia;

class SupplierController extends Controller
{
     public function index()
     {
          $suppliers = Supplier::paginate(50)->transform(function($supplier){
               return [
                    'id' => $supplier->id,
                    'name' => $supplier->name,
                    'phone' => $supplier->phone,
                    'status' => ($supplier->status) ? true : false,
                    'statusCaption' => ($supplier->status) ? 'Active' : 'Inactive'
               ];
          });

          return Inertia::render('Admin/Supplier/Index', ['data' => $suppliers]);
     }

     public function create()
     {
          return Inertia::render('Admin/Supplier/Create');
     }

     public function store(SupplierRequest $request)
     {
          $supplier = new Supplier;
          $supplier->name = $request->get('name');
          $supplier->country = $request->get('country');
          $supplier->state = $request->get('state');
          $supplier->city = $request->get('city');
          $supplier->address = $request->get('address');
          $supplier->phone = $request->get('phone');
          $supplier->email = $request->get('email');
          $supplier->status = ($request->get('status') == 'true') ? true : false;
          $supplier->save();

          return redirect()->route('supplier.index')->with('success', 'Supplier saved successfully');
     }

     public function edit(Supplier $supplier)
     {
          return Inertia::render('Admin/Supplier/Edit', ['data' => [
               'id' => $supplier->id,
               'name' => $supplier->name,
               'code' => $supplier->code,
               'country' => $supplier->country,
               'state' => $supplier->state,
               'city' => $supplier->city,
               'address' => $supplier->address,
               'phone' => $supplier->phone,
               'email' => $supplier->email,
               'status' => ($supplier->status) ? true : false,
          ]]);
     }

     public function update(SupplierRequest $request, Supplier $supplier)
     {
          $supplier->name = $request->get('name');
          $supplier->country = $request->get('country');
          $supplier->state = $request->get('state');
          $supplier->city = $request->get('city');
          $supplier->address = $request->get('address');
          $supplier->phone = $request->get('phone');
          $supplier->email = $request->get('email');
          $supplier->status = ($request->get('status') == 'true') ? true : false;
          $supplier->update();

          return redirect()->route('supplier.index')->with('success', 'Supplier updated successfully');
     }
}
