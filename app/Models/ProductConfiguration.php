<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductConfiguration extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['product_id', 'presentation_id', 'agency_id', 'code', 'is_transformable', 'status'];

     public function product()
     {
          return $this->belongsTo('App\Models\Product', 'product_id', 'id');
     }

     public function presentation()
     {
          return $this->belongsTo('App\Models\Presentation');
     }

     public function agency()
     {
          return $this->belongsTo('App\Models\Agency');
     }

     public function scopeActive($query)
     {
          return $query->where('status', true);
     }
}
