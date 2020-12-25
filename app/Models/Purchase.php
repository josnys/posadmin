<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Purchase extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['code', 'store_id', 'user_id', 'supplier_id', 'receipt_no', 'amount', 'tax', 'transport', 'approved', 'is_stock', 'notes'];

     public function details()
     {
          return $this->hasMany('App\Models\PurchaseDetail', 'purchase_id', 'id');
     }

     public function store()
     {
          return $this->belongsTo('App\Models\Store', 'store_id', 'id');
     }

     public function user()
     {
          return $this->belongsTo('App\Models\User', 'user_id', 'id');
     }

     public function supplier()
     {
          return $this->belongsTo('App\Models\Supplier', 'supplier_id', 'id');
     }

     public function getBarcodeAttribute()
     {
          return \DNS1D::getBarcodeHTML($this->code, 'C93');
     }

     public function getTotalAttribute()
     {
          return $this->amount + $this->tax + $this->transport;
     }
}
