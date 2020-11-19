<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \DB;

class Store extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['name', 'slogan', 'code', 'logo', 'gps_location', 'type'];

     public function contacts()
     {
          return $this->hasMany('App\Models\StoreContact', 'store_id', 'id');
     }

     public static function generateCode()
     {
          $code = mt_rand(1, 9999);
          $exists = DB::table('stores')->where('code', $code)->first();
          while($exists){
               $code = mt_rand(1, 9999);
               $exists = DB::table('stores')->where('code', $code)->first();
          }
          return 'ST'.str_pad((string)$code, 4, "0", STR_PAD_LEFT);
     }
}
