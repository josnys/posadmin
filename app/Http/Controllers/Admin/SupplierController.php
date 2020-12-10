<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SupplierRequest;
use App\Models\Supplier;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class SupplierController extends Controller
{
     public function index()
     {
          try {
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
          } catch (\Exception $e) {
               Log::error('Supplier index', ['data' => $e]);
          }
     }

     public function create()
     {
          try {
               return Inertia::render('Admin/Supplier/Create');
          } catch (\Exception $e) {
               Log::error('Supplier create', ['data' => $e]);
          }
     }

     public function store(SupplierRequest $request)
     {
          try {
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
          } catch (\Exception $e) {
               Log::error('Supplier save', ['data' => $e]);
          }
     }

     public function edit(Supplier $supplier)
     {
          try {
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
          } catch (\Exception $e) {
               Log::error('Supplier edit', ['data' => $e]);
          }
     }

     public function update(SupplierRequest $request, Supplier $supplier)
     {
          try {
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
          } catch (\Exception $e) {
               Log::error('Supplier update', ['data' => $e]);
          }
     }
}
