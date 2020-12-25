<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseDetailTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('purchase_details', function (Blueprint $table) {
               $table->id();
               $table->foreignId('purchase_id')->constrained();
               $table->foreignId('user_id')->constrained();
               $table->foreignId('product_configuration_id')->constrained();
               $table->double('quantity', 8,2)->default(1);
               $table->double('qty_stock', 8,2)->default(1);
               $table->double('cost', 8,2)->default(0);
               $table->double('tax', 8,2)->default(0);
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
          Schema::dropIfExists('purchase_details');
     }
}
