<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('customers', function (Blueprint $table) {
               $table->id();
               $table->foreignId('person_id')->constrained();
               $table->foreignId('user_id')->constrained();
               $table->string('company')->nullable();
               $table->double('discount', 8,2)->default(0);
               $table->double('credit', 8,2)->default(0);
               $table->double('debit', 8,2)->default(0);
               $table->double('points', 8,2)->default(0);
               $table->boolean('status')->default(true);
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
        Schema::dropIfExists('customers');
    }
}
