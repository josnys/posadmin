<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellDetailsTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('sell_details', function (Blueprint $table) {
               $table->id();
               $table->foreignId('sell_id')->constrained();
               $table->foreignId('product_configuration_id')->constrained();
               $table->foreignId('inventory_id')->constrained();
               $table->double('quantity', 8,2)->default(1);
               $table->double('price', 8,2)->default(1);
               $table->double('tax', 8,2)->default(0);
               $table->double('discount', 8,2)->default(0);
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
          Schema::dropIfExists('sell_details');
     }
}
