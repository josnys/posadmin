<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoriesTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('inventories', function (Blueprint $table) {
               $table->id();
               $table->foreignId('store_id')->constrained();
               $table->foreignId('stock_detail_id')->constrained();
               $table->foreignId('user_id')->constrained();
               $table->foreignId('product_configuration_id')->constrained();
               $table->double('qty_initial', 8,2)->default(1);
               $table->double('quantity', 8,2);
               $table->date('expiration')->nullable();
               $table->string('num_lot')->nullable();
               $table->double('cost', 8,2)->default(0);
               $table->double('price', 8,2)->default(0);
               $table->double('discount', 8,2)->default(0);
               $table->boolean('transformable')->default(false);
               $table->integer('transform_reference')->nullable();
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
          Schema::dropIfExists('inventories');
     }
}
