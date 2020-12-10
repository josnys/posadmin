<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreContactRequest;
use App\Models\Store;
use App\Models\StoreContact;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class StoreContactController extends Controller
{
     protected $types;

     public function __construct()
     {
          $this->types = ['Phone', 'Address', 'E-Mail', 'Fax', 'Facebook', 'Twitter', 'Instagram', 'WhatsApp'];
     }

     public function index(Store $store)
     {
          try {
               $contacts = StoreContact::where('store_id', $store->id)->paginate(50)->transform(function($contact){
                    return [
                         'id' => $contact->id,
                         'type' => $contact->name,
                         'reference' => $contact->reference,
                         'link' => ($contact->link) ? $contact->link : '-',
                         'status' => ($contact->status) ? true : false,
                         'statusCaption' => ($contact->status) ? 'Active' : 'Inactive'
                    ];
               });
               return Inertia::render('Admin/Store/Contact/Index', ['data' => [
                    'id' => $store->id,
                    'code' => $store->code,
                    'name' => $store->name,
                    'type' => $store->type,
                    'image' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null,
                    'contacts' => $contacts
               ]]);
          } catch (\Exception $e) {
               Log::error('StoreContact index', ['data' => $e]);
          }
     }

     public function create(Store $store)
     {
          try {
               return Inertia::render('Admin/Store/Contact/Create', ['data' => [
                    'id' => $store->id,
                    'code' => $store->code,
                    'name' => $store->name,
                    'image' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null,
                    'types' => $this->types
               ]]);
          } catch (\Exception $e) {
               Log::error('StoreContact create', ['data' => $e]);
          }
     }

     public function store(StoreContactRequest $request, Store $store)
     {
          try {
               $contact = new StoreContact;
               $contact->store_id = $store->id;
               $contact->name = $request->get('type');
               $contact->reference = $request->get('reference');
               $contact->link = $request->get('link');
               $contact->status = ($request->get('status') == 'true') ? true : false;
               $contact->save();
               return redirect()->route('store.show', $store->id)->with('success', 'Contact saved successfully');
          } catch (\Exception $e) {
               Log::error('StoreContact store', ['data' => $e]);
          }
     }

     public function edit(Store $store, StoreContact $contact)
     {
          try {
               return Inertia::render('Admin/Store/Contact/Edit', ['data' => [
                    'id' => $store->id,
                    'code' => $store->code,
                    'name' => $store->name,
                    'image' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null,
                    'types' => $this->types,
                    'contact' => [
                         'id' => $contact->id,
                         'type' => $contact->name,
                         'reference' => $contact->reference,
                         'link' => $contact->link,
                         'status' => ($contact->status) ? true : false,
                    ]
               ]]);
          } catch (\Exception $e) {
               Log::error('StoreContact edit', ['data' => $e]);
          }
     }

     public function update(StoreContactRequest $request, Store $store, StoreContact $contact)
     {
          try {
               $contact->name = $request->get('type');
               $contact->reference = $request->get('reference');
               $contact->link = $request->get('link');
               $contact->status = ($request->get('status') == 'true') ? true : false;
               $contact->update();
               return redirect()->route('store.show', $store->id)->with('success', 'Contact saved successfully');
          } catch (\Exception $e) {
               Log::error('StoreContact update', ['data' => $e]);
          }
     }
}
