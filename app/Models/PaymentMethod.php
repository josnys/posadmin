<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentMethod extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['name', 'status'];

     public function scopeActive($query)
     {
          return $query->where('status', true);
     }
}
