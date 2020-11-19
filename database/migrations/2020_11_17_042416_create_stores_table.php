<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('stores', function (Blueprint $table) {
               $table->id();
               $table->string('name')->nullable(false);
               $table->string('slogan')->nullable();
               $table->string('code')->unique();
               $table->string('logo')->nullable();
               $table->string('gps_location')->nullable();
               $table->string('type');
               $table->boolean('status')->default(false);
               $table->timestamps();
               $table->softDeletes();
          });
     }

     /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
          Schema::dropIfExists('stores');
     }
}
