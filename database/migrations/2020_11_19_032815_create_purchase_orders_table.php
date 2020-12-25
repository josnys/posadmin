<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseOrdersTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('purchase_orders', function (Blueprint $table) {
               $table->id();
               $table->string('code')->unique();
               $table->foreignId('store_id')->constrained();
               $table->foreignId('user_id')->constrained();
               $table->integer('merged_id')->nullable();
               $table->boolean('approved')->default(false);
               $table->integer('printed')->default(0);
               $table->boolean('purchased')->default(false);
               $table->text('note')->nullable();
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
          Schema::dropIfExists('purchase_orders');
     }
}
