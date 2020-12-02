<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \DB;

class PurchaseOrder extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['code', 'store_id', 'user_id', 'merged_id', 'approved', 'printed', 'note'];

     public function details()
     {
          return $this->hasMany('App\Models\PurchaseOrderDetails', 'purchase_order_id', 'id');
     }

     public function store()
     {
          return $this->belongsTo('App\Models\Store');
     }

     public function user()
     {
          return $this->belongsTo('App\Models\User');
     }

     public static function generateCode()
     {
          $code = mt_rand(1, 99999999);
          $exists = DB::table('purchase_orders')->where('code', $code)->first();
          while($exists){
               $code = mt_rand(1, 9999);
               $exists = DB::table('stores')->where('code', $code)->first();
          }
          return 'PO-'.str_pad((string)$code, 8, "0", STR_PAD_LEFT);
     }
}
