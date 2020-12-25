<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseDetail extends Model
{
     use HasFactory;

     protected $fillable = ['purchase_id', 'user_id', 'product_configuration_id', 'quantity', 'qty_stock', 'cost', 'tax'];

     public function productinfo()
     {
          return $this->belongsTo('App\Models\ProductConfiguration', 'product_configuration_id', 'id');
     }

     public function user()
     {
          return $this->belongsTo('App\Models\User', 'user_id', 'id');
     }
}
