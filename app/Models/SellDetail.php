<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SellDetail extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['sell_id', 'product_configuration_id', 'inventory_id', 'quantity', 'price', 'tax', 'discount'];

     public function productinfo()
     {
          return $this->belongsTo('App\Models\ProductConfiguration', 'product_configuration_id', 'id');
     }
}
