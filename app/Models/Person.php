<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Person extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['firstname', 'lastname', 'code', 'dob', 'sex', 'identification', 'identification_type', 'address', 'phone'];

     public function getNameAttribute()
     {
          return "{$this->firstname} {$this->lastname}";
     }

     public function customer()
     {
          return $this->hasOne('App\Models\Customer');
     }

     public static function generateCode()
     {
          $rand = mt_rand(1, 9999);
          $rand = str_pad($rand, 5, 0, STR_PAD_LEFT);
          while(self::codeExists($rand)){
               $rand = mt_rand(1, 9999);
               $rand = str_pad($rand, 5, 0, STR_PAD_LEFT);
          }
          return $rand;
     }

     public static function codeExists($code)
     {
          $person = DB::select('select * from people where code = ?', [$code]);
          if(count($person) > 0){
               return true;
          }
          return false;
     }
}
