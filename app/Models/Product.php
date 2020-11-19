<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['category_id', 'subcategory_id', 'name', 'description', 'image', 'status', 'is_validate'];

     public function category()
     {
          return $this->belongsTo('App\Models\Category');
     }

     public function subcategory()
     {
          return $this->belongsTo('App\Models\Subcategory');
     }

     public function configurations()
     {
          return $this->hasMany('App\Models\ProductConfiguration');
     }
}
