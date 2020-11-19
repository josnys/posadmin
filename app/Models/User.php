<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
     use LaratrustUserTrait;
     use HasFactory, Notifiable;
     use SoftDeletes;

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
          'firstname', 'lastname', 'code', 'username', 'email', 'dob', 'sex', 'identification', 'identification_type', 'address', 'phone', 'pin', 'multi_connect', 'password', 'profile_url'
     ];

     /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
     protected $hidden = [
          'password', 'remember_token',
     ];

     /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
     protected $casts = [
          'email_verified_at' => 'datetime',
     ];

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
