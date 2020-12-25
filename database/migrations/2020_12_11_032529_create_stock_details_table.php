<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStockDetailsTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('stock_details', function (Blueprint $table) {
               $table->id();
               $table->foreignId('stock_id')->constrained();
               $table->foreignId('product_configuration_id')->constrained();
               $table->date('expiration')->nullable();
               $table->string('num_lot')->nullable();
               $table->double('quantity', 8,2)->default(1);
               $table->double('qty_inventary', 8,2)->default(0); // korije "qty_inventary" to "qty_inventory"
               $table->double('cost', 8,2)->default(0);
               $table->double('price', 8,2)->default(0);
               $table->timestamps();
          });
     }

     /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
          Schema::dropIfExists('stock_details');
     }
}
