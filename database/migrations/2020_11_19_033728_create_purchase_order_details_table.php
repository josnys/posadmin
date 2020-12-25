<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseOrderDetailsTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('purchase_order_details', function (Blueprint $table) {
               $table->id();
               $table->foreignId('purchase_order_id')->constrained();
               $table->foreignId('product_configuration_id')->constrained();
               $table->foreignId('user_id')->constrained();
               $table->double('quantity', 8,2)->default(1);
               $table->double('received', 8,2)->default(0);
               $table->boolean('is_complete')->default(false);
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
          Schema::dropIfExists('purchase_order_details');
     }
}
