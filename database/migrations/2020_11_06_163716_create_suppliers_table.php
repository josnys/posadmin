<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('suppliers', function (Blueprint $table) {
               $table->id();
               $table->string('name')->nullable(false);
               $table->string('country')->nullable(false)->default('Haïti');
               $table->string('state')->nullable(false)->default('Ouest');
               $table->string('city')->nullable(false)->default('Port-au-Prince');
               $table->string('address')->nullable();
               $table->string('phone')->nullable();
               $table->string('email')->nullable();
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
          Schema::dropIfExists('suppliers');
     }
}
