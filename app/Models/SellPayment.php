<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SellPayment extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['sell_id', 'payment_method_id', 'currency_id', 'currency_rate_sell', 'currency_rate_buy', 'reference', 'amount', 'paid', 'return'];

     public function paymethod()
     {
          return $this->belongsTo('App\Models\PaymentMethod', 'payment_method_id', 'id');
     }

     public function currency()
     {
          return $this->belongsTo('App\Models\Currency');
     }
}
