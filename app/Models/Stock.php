<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stock extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['purchase_id', 'store_id', 'user_id', 'code', 'approved', 'notes'];

     public function details()
     {
          return $this->hasMany('App\Models\StockDetail', 'stock_id', 'id');
     }

     public function user()
     {
          return $this->belongsTo('App\Models\User', 'user_id', 'id');
     }
}
