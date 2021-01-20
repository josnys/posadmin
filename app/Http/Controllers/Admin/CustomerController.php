<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\CustomerRequest;
use App\Models\Customer;
use App\Models\Person;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller
{
     protected $userSex;
     protected $identityType;

     public function __construct()
     {
          $this->userSex = [
               ['code' => 'Man', 'name' => 'Man'],
               ['code' => 'Woman', 'name' => 'Woman']
          ];
          $this->identityType = [
               ['code' => 'CIN', 'name' => 'CIN'],
               ['code' => 'Passport', 'name' => 'Passport'],
               ['code' => 'Driver License', 'name' => 'Driver License']
          ];
     }

     public function index()
     {
          try {
               $customers = Customer::with('person')->paginate(50)->transform(function($customer){
                    return [
                         'id' => $customer->id,
                         'code' => $customer->person->code,
                         'name' => $customer->person->name,
                         'discount' => $customer->discount,
                         'credit' => $customer->credit,
                         'debit' => $customer->debit,
                         'status' => ($customer->status) ? true : false,
                         'statusCaption' => ($customer->status) ? 'Active' : 'Inactive'
                    ];
               });

               return Inertia::render('Admin/Customer/Index', ['data' => $customers]);
          } catch (\Exception $e) {
               Log::error('Customer index', ['data' => $e]);
          }
     }

     public function create()
     {
          try {
               return Inertia::render('Admin/Customer/Create', ['data' => [
                    'sexes' => $this->userSex,
                    'identityType' => $this->identityType
               ]]);
          } catch (\Exception $e) {
               Log::error('Customer create', ['data' => $e]);
          }
     }

     public function store(CustomerRequest $request)
     {
          try {
               DB::transaction(function() use ($request){
                    $code = Person::generateCode();
                    $person = new Person;
                    $person->firstname = $request->get('fname');
                    $person->lastname = $request->get('lname');
                    $person->code = $code;
                    $person->dob = $request->get('dob');
                    $person->sex = $request->get('sex');
                    $person->identification = $request->get('identification');
                    $person->identification_type = $request->get('identificationType');
                    $person->address = $request->get('address');
                    $person->phone = $request->get('phone');
                    $person->email = $request->get('email');
                    $person->save();
                    $pid = $person->id;

                    $customer = new Customer;
                    $customer->person_id = $pid;
                    $customer->user_id = $request->user()->id;
                    $customer->company = $request->get('company');
                    $customer->discount = $request->get('discount');
                    $customer->credit = 0;
                    $customer->debit = 0;
                    $customer->points = 0;
                    $customer->status = true;
                    $customer->save();
               });
               return redirect()->route('customer.index')->with('success', 'Customer saved successfully.');
          } catch (\Exception $e) {
               Log::error('Customer store', ['data' => $e]);
          }
     }

     public function edit(Customer $customer)
     {
          try {
               $customer = Customer::with('person')->find($customer->id);
               return Inertia::render('Admin/Customer/Edit', ['data' => [
                    'sexes' => $this->userSex,
                    'identityType' => $this->identityType,
                    'id' => $customer->id,
                    'fname' => $customer->person->firstname,
                    'lname' => $customer->person->lastname,
                    'code' => $customer->person->code,
                    'dob' => $customer->person->dob,
                    'sex' => $customer->person->sex,
                    'identification' => $customer->person->identification,
                    'identificationType' => $customer->person->identification_type,
                    'address' => $customer->person->address,
                    'phone' => $customer->person->phone,
                    'email' => $customer->person->email,
                    'company' => $customer->company,
                    'discount' => $customer->discount,
                    'credit' => $customer->credit,
                    'debit' => $customer->debit,
                    'status' => ($customer->status) ? true : false,
               ]]);
          } catch (\Exception $e) {
               Log::error('Customer edit', ['data' => $e]);
          }
     }

     public function update(CustomerRequest $request, Customer $customer)
     {
          try {
               DB::transaction(function() use ($request, &$customer){
                    $person = Person::find($customer->person_id);
                    $person->firstname = $request->get('fname');
                    $person->lastname = $request->get('lname');
                    $person->dob = $request->get('dob');
                    $person->sex = $request->get('sex');
                    $person->identification = $request->get('identification');
                    $person->identification_type = $request->get('identificationType');
                    $person->address = $request->get('address');
                    $person->email = $request->get('email');
                    $person->phone = $request->get('phone');
                    $person->update();
                    $pid = $person->id;

                    $customer->company = $request->get('company');
                    $customer->discount = $request->get('discount');
                    // $customer->credit = $request->get('credit');
                    // $customer->debit = $request->get('debit');
                    $customer->status = ($request->get('status') == 'true') ? true : false;
                    $customer->update();
               });
               return redirect()->route('customer.index')->with('success', 'Customer updated successfully.');
          } catch (\Exception $e) {
               Log::error('Customer store', ['data' => $e]);
          }
     }
}
