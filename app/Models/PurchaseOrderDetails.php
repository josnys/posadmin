<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrderDetails extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['purchase_order_id', 'product_configuration_id', 'user_id', 'quantity', 'received', 'is_complete'];

     public function productinfo()
     {
          return $this->belongsTo('App\Models\ProductConfiguration', 'product_configuration_id', 'id');
     }

     public function user()
     {
          return $this->belongsTo('App\Models\User', 'user_id', 'id');
     }
}
