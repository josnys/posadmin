<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Sell extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['code', 'type', 'store_id', 'user_id', 'customer_id', 'amount', 'tax', 'discount', 'delivery'];

     public function store()
     {
          return $this->belongsTo('App\Models\Store');
     }

     public function user()
     {
          return $this->belongsTo('App\Models\User');
     }

     public function customer()
     {
          return $this->belongsTo('App\Models\Customer');
     }

     public function details()
     {
          return $this->hasMany('App\Models\SellDetail');
     }

     public function payments()
     {
          return $this->hasMany('App\Models\SellPayment');
     }

     public static function generateCode($storeCode)
     {
          $rand = mt_rand(1, 9999999999);
          $rand = $storeCode.'-'.str_pad($rand, 10, 0, STR_PAD_LEFT);
          while(self::codeExists($rand)){
               $rand = mt_rand(1, 9999999999);
               $rand = $storeCode.'-'.str_pad($rand, 10, 0, STR_PAD_LEFT);
          }
          return $rand;
     }

     public static function codeExists($code)
     {
          $sell = DB::select('select * from sells where code = ?', [$code]);
          if(count($sell) > 0){
               return true;
          }
          return false;
     }
}
