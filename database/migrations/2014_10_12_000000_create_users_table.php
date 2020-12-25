<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('people', function(Blueprint $table){
               $table->id();
               $table->string('firstname');
               $table->string('lastname');
               $table->string('email')->nullable();
               $table->string('code')->unique();
               $table->date('dob')->nullable();
               $table->string('sex')->nullable();
               $table->string('identification')->nullable();
               $table->string('identification_type')->nullable();
               $table->string('address')->nullable();
               $table->string('phone')->nullable();
               $table->timestamps();
               $table->softDeletes();
          });

          Schema::create('users', function (Blueprint $table) {
               $table->id();
               $table->foreignId('person_id')->constrained();
               $table->string('username')->unique();
               $table->string('email')->unique();
               $table->string('password');
               $table->string('pin')->nullable();
               $table->boolean('multi_connect')->default(false);
               $table->timestamp('email_verified_at')->nullable();
               $table->rememberToken();
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
          Schema::dropIfExists('people');
          Schema::dropIfExists('users');
     }
}
