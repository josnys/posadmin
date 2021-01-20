<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Currency extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = ['name', 'code', 'sell_rate', 'buy_rate', 'is_default', 'user_id', 'status'];
}
