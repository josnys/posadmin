<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStocksTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('stocks', function (Blueprint $table) {
               $table->id();
               $table->foreignId('purchase_id')->constrained();
               $table->foreignId('store_id')->constrained();
               $table->foreignId('user_id')->constrained();
               $table->string('code');
               $table->boolean('approved')->default(false);
               $table->text('notes')->nullable();
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
          Schema::dropIfExists('stocks');
     }
}
