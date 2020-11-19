<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\AgencyRequest;
use App\Models\Agency;
use Inertia\Inertia;

class AgencyController extends Controller
{
     public function index()
     {
          $agencies = Agency::paginate(50)->transform(function($agency){
               return [
                    'id' => $agency->id,
                    'name' => $agency->name,
                    'code' => $agency->code,
                    'phone' => $agency->phone,
                    'status' => ($agency->status) ? true : false,
                    'statusCaption' => ($agency->status) ? 'Active' : 'Inactive'
               ];
          });

          return Inertia::render('Admin/Agency/Index', ['data' => $agencies]);
     }

     public function create()
     {
          return Inertia::render('Admin/Agency/Create');
     }

     public function store(AgencyRequest $request)
     {
          $agency = new Agency;
          $agency->name = $request->get('name');
          $agency->code = $request->get('code');
          $agency->country = $request->get('country');
          $agency->state = $request->get('state');
          $agency->city = $request->get('city');
          $agency->address = $request->get('address');
          $agency->phone = $request->get('phone');
          $agency->email = $request->get('email');
          $agency->status = ($request->get('status') == 'true') ? true : false;
          $agency->save();

          return redirect()->route('agency.index')->with('success', 'Agency saved successfully');
     }

     public function edit(Agency $agency)
     {
          return Inertia::render('Admin/Agency/Edit', ['data' => [
               'id' => $agency->id,
               'name' => $agency->name,
               'code' => $agency->code,
               'country' => $agency->country,
               'state' => $agency->state,
               'city' => $agency->city,
               'address' => $agency->address,
               'phone' => $agency->phone,
               'email' => $agency->email,
               'status' => ($agency->status) ? true : false,
          ]]);
     }

     public function update(AgencyRequest $request, Agency $agency)
     {
          $agency->name = $request->get('name');
          $agency->code = $request->get('code');
          $agency->country = $request->get('country');
          $agency->state = $request->get('state');
          $agency->city = $request->get('city');
          $agency->address = $request->get('address');
          $agency->phone = $request->get('phone');
          $agency->email = $request->get('email');
          $agency->status = ($request->get('status') == 'true') ? true : false;
          $agency->update();

          return redirect()->route('agency.index')->with('success', 'Agency updated successfully');
     }
}
