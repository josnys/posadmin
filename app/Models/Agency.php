<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agency extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['name', 'code', 'country', 'state', 'city', 'address', 'phone', 'email', 'status'];
}
