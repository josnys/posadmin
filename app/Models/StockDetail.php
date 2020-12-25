<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockDetail extends Model
{
     use HasFactory;
     // korije "qty_inventary" to "qty_inventory"
     protected $fillable = ['stock_id', 'product_configuration_id', 'expiration', 'num_lot', 'quantity', 'qty_inventary', 'cost', 'price'];

     public function stock()
     {
          return $this->belongsTo('App\Models\Stock');
     }

     public function productinfo()
     {
          return $this->belongsTo('App\Models\ProductConfiguration', 'product_configuration_id', 'id');
     }

     public function user()
     {
          return $this->belongsTo('App\Models\User', 'user_id', 'id');
     }
}
