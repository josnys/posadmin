<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoreContactsTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('store_contacts', function (Blueprint $table) {
               $table->id();
               $table->foreignId('store_id')->constrained();
               $table->string('name')->nullable(false);
               $table->string('reference')->nullable(false);
               $table->string('link')->nullable();
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
        Schema::dropIfExists('store_contacts');
    }
}
