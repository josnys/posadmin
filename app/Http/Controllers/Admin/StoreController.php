<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRequest;
use App\Models\Store;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class StoreController extends Controller
{
     protected $type;

     public function __construct()
     {
          $this->type = ['Online Store', 'Restaurant', 'Super Market', 'Store'];
     }

     public function index()
     {
          try {
               $stores = Store::paginate(50)->transform(function($store){
                    return [
                         'id' => $store->id,
                         'code' => $store->code,
                         'name' => $store->name,
                         'image' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null,
                         'type' => $store->type,
                         'status' => ($store->status) ? true : false,
                         'statusCaption' => ($store->status) ? 'Active' : 'Inactive'
                    ];
               });
               return Inertia::render('Admin/Store/Index', ['data' => $stores]);
          } catch (\Exception $e) {
               Log::error('Store index', ['data' => $e]);
          }
     }

     public function create()
     {
          try {
               return Inertia::render('Admin/Store/Create', ['data' => ['types' => $this->type]]);
          } catch (\Exception $e) {
               Log::error('Store create', ['data' => $e]);
          }
     }

     public function store(StoreRequest $request)
     {
          try {
               $mediaName = null;
               if($request->hasFile('image')){
                    $mediaPath = $request->file('image')->store('stores/');
                    $index = count(explode('/', $mediaPath)) - 1;
                    $mediaName = explode('/', $mediaPath)[$index];
               }
               $code = Store::generateCode();
               $store = new Store;
               $store->name = $request->get('name');
               $store->slogan = $request->get('slogan');
               $store->code = $code;
               $store->logo = $mediaName;
               $store->type = $request->get('type');
               $store->status = ($request->get('status') == 'true') ? true : false;
               $store->save();

               return redirect()->route('store.index')->with('success', 'Store saved successfully.');
          } catch (\Exception $e) {
               Log::error('Store store', ['data' => $e]);
          }
     }

     public function show(Store $store)
     {
          try {
               $store = Store::with('contacts')->find($store->id);
               $contacts = array();
               if($store->contacts->count() > 0){
                    foreach($store->contacts as $contact){
                         array_push($contacts, [
                              'id' => $contact->id,
                              'type' => $contact->name,
                              'reference' => $contact->reference,
                              'status' => ($contact->status) ? true : false,
                              'statusCaption' => ($contact->status) ? 'Active' : 'Inactive'
                         ]);
                    }
               }

               return Inertia::render('Admin/Store/Show', ['data' => [
                    'id' => $store->id,
                    'code' => $store->code,
                    'name' => $store->name,
                    'slogan' => $store->slogan,
                    'image' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null,
                    'type' => $store->type,
                    'status' => ($store->status) ? true : false,
                    'statusCaption' => ($store->status) ? 'Active' : 'Inactive',
                    'contacts' => $contacts
               ]]);
          } catch (\Exception $e) {
               Log::error('Store show', ['data' => $e]);
          }
     }

     public function edit(Store $store)
     {
          try {
               return Inertia::render('Admin/Store/Edit', ['data' => [
                    'id' => $store->id,
                    'code' => $store->code,
                    'name' => $store->name,
                    'slogan' => $store->slogan,
                    'image' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null,
                    'type' => $store->type,
                    'status' => ($store->status) ? true : false,
                    'types' => $this->type
               ]]);
          } catch (\Exception $e) {
               Log::error('Store edit', ['data' => $e]);
          }
     }

     public function update(StoreRequest $request, Store $store)
     {
          try {
               $mediaName = $store->logo;
               if($request->hasFile('image')){
                    $mediaPath = $request->file('image')->store('stores/');
                    $index = count(explode('/', $mediaPath)) - 1;
                    $mediaName = explode('/', $mediaPath)[$index];
               }

               $store->name = $request->get('name');
               $store->slogan = $request->get('slogan');
               $store->logo = $mediaName;
               $store->type = $request->get('type');
               $store->status = ($request->get('status') == 'true') ? true : false;
               $store->update();

               return redirect()->route('store.show', $store->id)->with('success', 'Store updated successfully.');
          } catch (\Exception $e) {
               Log::error('Store update', ['data' => $e]);
          }
     }
}
