<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\SellRequest;
use App\Models\Sell;
use App\Models\SellDetail;
use App\Models\SellPayment;
use App\Models\Inventory;
use App\Models\Store;
use App\Models\Currency;
use App\Models\PaymentMethod;
use App\Models\Customer;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class SellController extends Controller
{
     public function create(Store $store)
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
               $customer = Customer::with('person')->find(1);
               $currencies = Currency::where('status', true)->get();
               $currencyArr = array();
               foreach($currencies as $currency){
                    array_push($currencyArr, [
                         'id' => $currency->id,
                         'code' => $currency->code,
                         'rate' => $currency->buy_rate,
                         'is_default' => ($currency->is_default) ? true : false,
                    ]);
               }
               $pmethods = PaymentMethod::active()->get();
               $paymethods = array();
               foreach($pmethods as $method){
                    array_push($paymethods, [
                         'id' => $method->id,
                         'name' => $method->name,
                         'isSelected' => false,
                    ]);
               }
               return Inertia::render('Dashboard/Sale/Create', ['data' => [
                    'store' => [
                         'id' => $store->id,
                         'code' => $store->code,
                         'name' => $store->name,
                         'slogan' => $store->slogan,
                         'image' => ($store->logo) ? route('show.image', 'stores/'.$store->logo) : null,
                         'type' => $store->type,
                         'status' => ($store->status) ? true : false,
                         'statusCaption' => ($store->status) ? 'Active' : 'Inactive',
                         'contacts' => $contacts,
                    ],
                    'customer' => [
                         'id' => $customer->id,
                         'name' => $customer->person->name,
                         'discount' => $customer->discount,
                         'credit' => $customer->credit,
                         'debit' => $customer->debit,
                    ],
                    'currency' => $currencyArr,
                    'paymethods' => $paymethods
               ]]);
          } catch (\Exception $e) {
               Log::error('Sell create', ['data' => $e]);
          }
     }

     public function store(SellRequest $request, Store $store)
     {
          try {
               $sId = null;
               DB::transaction(function() use ($request, $store, &$sId){
                    $code = Sell::generateCode($store->code);
                    $sell = new Sell;
                    $sell->code = $code;
                    $sell->type = $request->get('type');
                    $sell->store_id = $store->id;
                    $sell->user_id = $request->user()->id;
                    $sell->customer_id = $request->get('customer');
                    $sell->amount = $request->get('amount');
                    $sell->tax = $request->get('tax');
                    $sell->discount = $request->get('discount');
                    $sell->delivery = $request->get('delivery');
                    $sell->save();
                    $sId = $sell->id;

                    $items = $request->get('items');
                    foreach($items as $item){
                         $inventory = Inventory::find($item['inventory_code']);
                         if(!$inventory){
                              abort(422);
                         }
                         if($inventory->quantity == 0 || ($inventory->quantity < $item['quantity'])){
                              abort(422);
                         }
                         $detail = new SellDetail;
                         $detail->sell_id = $sId;
                         $detail->product_configuration_id = $inventory->product_configuration_id;
                         $detail->inventory_id = $inventory->id;
                         $detail->quantity = $item['quantity'];
                         $detail->price = $item['price'];
                         $detail->tax = ($item['tax']) ? $item['tax'] : 0;
                         $detail->discount = ($item['discount']) ? $item['discount'] : 0;
                         $detail->save();

                         $inventory->quantity = $inventory->quantity - (float)$item['quantity'];
                         $inventory->update();
                    }
                    $payments = $request->get('payments');
                    foreach($payments as $payment){
                         $currency = Currency::find($payment['currency']);
                         $method = PaymentMethod::find($payment['method']);
                         $pay = new SellPayment;
                         $pay->sell_id = $sId;
                         $pay->payment_method_id = $method->id;
                         $pay->currency_id = $currency->id;
                         $pay->currency_rate_sell = $currency->sell_rate;
                         $pay->currency_rate_buy = $currency->buy_rate;
                         $pay->reference = $payment['reference'];
                         $pay->amount = $payment['amount'];
                         $pay->paid = $payment['paid'];
                         $pay->return = ((float)$payment['amount'] - (float)$payment['paid']);
                         $pay->save();
                    }
               });
               // Send for printing or send email or sms to client.
               return redirect()->route('sell.show', [$store->id, $sId])->with('success', 'Thank you for your purchase.');
          } catch (\Exception $e) {
               Log::error('Sell store', ['data' => $e]);
          }
     }

     public function show(Request $request, Store $store, Sell $sell)
     {
          try {
               $store = Store::with('users')->find($store->id);
               $users = $store->users->pluck('id')->toArray();
               // if(!in_array($request->user()->id, $users)){
               //      return redirect()->back()->with('error', 'You are not allowed to view this data.');
               // }
               $data = $this->retrieveSell($sell->id);
               return Inertia::render('Dashboard/Sale/Show', ['data' => $data]);
          } catch (\Exception $e) {
               Log::error('Sell show', ['data' => $e]);
          }
     }

     public function retrieveSell($id)
     {
          try {
               $sell = Sell::with(['store' => function($store){
                    return $store->with('contacts');
               }])->with(['user' => function($user){
                    return $user->with('person');
               }])->with(['customer' => function($customer){
                    return $customer->with('person');
               }])->with(['details' => function($details){
                    return $details->with(['productinfo' => function($productinfo){
                         return $productinfo->with('presentation')->with('agency');
                    }]);
               }])->with(['payments' => function($payments){
                    return $payments->with('paymethod')->with('currency');
               }])->find($id);

               $storeContacts = array();
               foreach($sell->store->contacts as $contact){
                    array_push($storeContacts, [
                         'type' => $contact->name,
                         'reference' => $contact->reference,
                         'link' => ($contact->link) ? $contact->link : null
                    ]);
               }
               $currency = Currency::where('is_default', true)->first();
               $discount = ((($sell->amount + $sell->tax) * $sell->discount) / 100);
               return [
                    'code' => $sell->code,
                    'currency' => [
                         'code' => $currency->code,
                    ],
                    'type' => $sell->type,
                    'store' => [
                         'id' => $sell->store->id,
                         'code' => $sell->store->code,
                         'name' => $sell->store->name,
                         'image' => ($sell->store->logo) ? route('show.image', 'stores/'.$sell->store->logo) : null,
                         'slogan' => $sell->store->slogan,
                         'contacts' => $storeContacts
                    ],
                    'user' => [
                         'code' => $sell->user->person->code,
                         'name' => $sell->user->person->name
                    ],
                    'customer' => [
                         'code' => $sell->customer->person->code,
                         'name' => $sell->customer->person->name
                    ],
                    'amount' => $sell->amount,
                    'tax' => $sell->tax,
                    'discount' => $discount,
                    'delivery' => $sell->delivery,
                    'total' => ((($sell->amount + $sell->tax) - $discount) + $sell->delivery),
                    'details' => $this->formatDetails($sell->details),
                    'payments' => $this->formatPayments($sell->payments),
                    'created' => $sell->created_at->toDateTimeString()
               ];
          } catch (\Exception $e) {
               Log::error('Sell retrieve', ['data' => $e]);
          }
     }


     public function formatDetails($details)
     {
          try {
               $data = array();
               foreach($details as $detail){
                    array_push($data, [
                         'name' => "{$detail->productinfo->product->name} {$detail->productinfo->agency->name} {$detail->productinfo->presentation->name}",
                         'quantity' => $detail->quantity,
                         'price' => $detail->price,
                         'tax' => $detail->tax,
                         'discount' => $detail->discount,
                         'subtotal' => (($detail->quantity * $detail->price) + $detail->tax + $detail->discount)
                    ]);
               }
               return $data;
          } catch (\Exception $e) {
               Log::error('Sell format details', ['data' => $e]);
          }
     }

     public function formatPayments($payments)
     {
          try {
               $pays = array();
               foreach($payments as $payment){
                    array_push($pays, [
                         'method' => $payment->paymethod->name,
                         'currency' => $payment->currency->code,
                         'paid' => $payment->paid,
                         'paidEquivalent' => ($payment->paid * $payment->currency_rate_buy)
                    ]);
               }
               return $pays;
          } catch (\Exception $e) {
               Log::error('Sell format payments', ['data' => $e]);
          }
     }
}
