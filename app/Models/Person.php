<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Person extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['firstname', 'lastname', 'code', 'dob', 'sex', 'identification', 'identification_type', 'address', 'phone'];

     public function getNameAttribute()
     {
          return "{$this->firstname} {$this->lastname}";
     }

     public static function generateCode()
     {
          $rand = mt_rand(1, 9999);
          return str_pad($rand, 5, 0, STR_PAD_LEFT);
     }
}
