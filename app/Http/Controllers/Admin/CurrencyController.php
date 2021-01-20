<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\CurrencyRequest;
use App\Models\Currency;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CurrencyController extends Controller
{
     public function index()
     {
          try {
               $currencies =  Currency::paginate(50)->transform(function($currency){
                    return [
                         'id' => $currency->id,
                         'name' => $currency->name,
                         'code' => $currency->code,
                         'sell' => $currency->sell_rate,
                         'buy' => $currency->buy_rate,
                         'is_default' => ($currency->is_default) ? 'Yes' : 'No',
                         'status' => ($currency->status) ? true : false,
                         'statusCaption' => ($currency->status) ? 'Active' : 'Inactive'
                    ];
               });
               return Inertia::render('Admin/Currency/Index', ['data' => $currencies]);
          } catch (\Exception $e) {
               Log::error('Currency index', ['data' => $e]);
          }
     }

     public function create()
     {
          try {
               return Inertia::render('Admin/Currency/Create');
          } catch (\Exception $e) {
               Log::error('Currency create', ['data' => $e]);
          }
     }

     public function store(CurrencyRequest $request)
     {
          try {
               DB::transaction(function() use ($request){
                    $defaults = Currency::where('is_default', true)->get();
                    if($defaults->count() > 0){
                         foreach($defaults as $default){
                              if($default->is_default && ($request->get('status') == 'true')){
                                   $default->is_default = false;
                                   $default->update();
                              }
                         }
                    }
                    $currency = new Currency;
                    $currency->name = $request->get('name');
                    $currency->code = $request->get('code');
                    $currency->sell_rate = $request->get('sell');
                    $currency->buy_rate = $request->get('buy');
                    $currency->is_default = ($request->get('is_default') == 'true') ? true : false;
                    $currency->status = ($request->get('status') == 'true') ? true : false;
                    $currency->user_id = $request->user()->id;
                    $currency->save();
               });
               return redirect()->route('currency.index')->with('success', 'Currency saved successfully.');
          } catch (\Exception $e) {
               Log::error('Currency store', ['data' => $e]);
          }
     }

     public function edit(Currency $currency)
     {
          try {
               return Inertia::render('Admin/Currency/Edit', ['data' => [
                    'id' => $currency->id,
                    'name' => $currency->name,
                    'code' => $currency->code,
                    'sell' => $currency->sell_rate,
                    'buy' => $currency->buy_rate,
                    'is_default' => ($currency->is_default) ? true : false,
                    'status' => ($currency->status) ? true : false,
               ]]);
          } catch (\Exception $e) {
               Log::error('Currency edit', ['data' => $e]);
          }
     }

     public function update(CurrencyRequest $request, Currency $currency)
     {
          try {
               DB::transaction(function() use ($request, &$currency){
                    $defaults = Currency::where('is_default', true)->whereNotIn('id', [$currency->id])->get();
                    if($defaults->count() > 0){
                         foreach($defaults as $default){
                              if($default->is_default && ($request->get('status') == 'true')){
                                   $default->is_default = false;
                                   $default->update();
                              }
                         }
                    }

                    $currency->name = $request->get('name');
                    $currency->code = $request->get('code');
                    $currency->sell_rate = $request->get('sell');
                    $currency->buy_rate = $request->get('buy');
                    $currency->is_default = ($request->get('is_default') == 'true' || ($defaults->count() == 0)) ? true : false;
                    $currency->status = ($request->get('status') == 'true') ? true : false;
                    $currency->update();
               });
               return redirect()->route('currency.index')->with('success', 'Currency updated successfully.');
          } catch (\Exception $e) {
               Log::error('Currency update', ['data' => $e]);
          }
     }
}
