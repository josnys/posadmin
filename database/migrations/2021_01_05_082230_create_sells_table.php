<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellsTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('sells', function (Blueprint $table) {
               $table->id();
               $table->string('code')->unique();
               $table->string('type')->default('Vente');
               $table->foreignId('store_id')->constrained();
               $table->foreignId('user_id')->constrained();
               $table->foreignId('customer_id')->constrained();
               $table->double('amount', 8,2)->default(0);
               $table->double('tax', 8,2)->default(0);
               $table->double('discount', 8,2)->default(0);
               $table->double('delivery', 8,2)->default(0);
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
          Schema::dropIfExists('sells');
     }
}
