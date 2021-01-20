<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
     use HasFactory;

     protected $fillable = ['store_id', 'stock_detail_id', 'user_id', 'product_configuration_id', 'qty_initial', 'quantity', 'expiration', 'num_lot', 'cost', 'price', 'discount', 'transformable', 'transform_reference'];

     public function stockdetail()
     {
          return $this->belongsTo('App\Models\StockDetail');
     }

     public function store()
     {
          return $this->belongsTo('App\Models\Store');
     }

     public function productinfo()
     {
          return $this->belongsTo('App\Models\ProductConfiguration', 'product_configuration_id', 'id');
     }

     public function user()
     {
          return $this->belongsTo('App\Models\User', 'user_id', 'id');
     }

     public function scopeExist($query)
     {
          return $query->where('quantity', '>', 0);
     }
}
