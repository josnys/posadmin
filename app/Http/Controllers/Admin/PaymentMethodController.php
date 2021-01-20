<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PaymentMethodRequest;
use App\Models\PaymentMethod;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PaymentMethodController extends Controller
{
     public function index()
     {
          try {
               $paymethods = PaymentMethod::paginate(50)->transform(function($paymethod){
                    return [
                         'id' => $paymethod->id,
                         'name' => $paymethod->name,
                         'status' => ($paymethod->status) ? true : false,
                         'statusCaption' => ($paymethod->status) ? 'Active' : 'Inactive'
                    ];
               });
               return Inertia::render('Admin/PayMethod/Index', ['data' => $paymethods]);
          } catch (\Exception $e) {
               Log::error('Payment Method index', ['data' => $e]);
          }
     }

     public function create()
     {
          try {
               return Inertia::render('Admin/PayMethod/Create');
          } catch (\Exception $e) {
               Log::error('Payment Method create', ['data' => $e]);
          }
     }

     public function store(PaymentMethodRequest $request)
     {
          try {
               $paymethod = new PaymentMethod;
               $paymethod->name = $request->get('name');
               $paymethod->status = ($request->get('status') == 'true') ? true : false;
               $paymethod->save();
               return redirect()->route('paymethod.index')->with('success', 'Payment Method saved successfully.');
          } catch (\Exception $e) {
               Log::error('Payment Method store', ['data' => $e]);
          }
     }

     public function edit(PaymentMethod $paymethod)
     {
          try {
               return Inertia::render('Admin/PayMethod/Edit', ['data' => [
                    'id' => $paymethod->id,
                    'name' => $paymethod->name,
                    'status' => ($paymethod->status) ? true : false,
               ]]);
          } catch (\Exception $e) {
               Log::error('Payment Method edit', ['data' => $e]);
          }
     }

     public function update(PaymentMethodRequest $request, PaymentMethod $paymethod)
     {
          try {
               $paymethod->name = $request->get('name');
               $paymethod->status = ($request->get('status') == 'true') ? true : false;
               $paymethod->update();
               return redirect()->route('paymethod.index')->with('success', 'Payment Method updated successfully.');
          } catch (\Exception $e) {
               Log::error('Payment Method update', ['data' => $e]);
          }
     }
}
