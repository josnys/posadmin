<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['person_id', 'user_id', 'company', 'discount', 'credit', 'debit', 'points', 'status'];

     public function person()
     {
          return $this->belongsTo('App\Models\Person');
     }
}
