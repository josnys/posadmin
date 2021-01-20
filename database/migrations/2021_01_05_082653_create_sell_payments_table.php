<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellPaymentsTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('sell_payments', function (Blueprint $table) {
               $table->id();
               $table->foreignId('sell_id')->constrained();
               $table->foreignId('payment_method_id')->constrained();
               $table->foreignId('currency_id')->constrained();
               $table->double('currency_rate_sell', 8,2)->default(0);
               $table->double('currency_rate_buy', 8,2)->default(0);
               $table->string('reference')->nullable();
               $table->double('amount', 8,2)->default(0);
               $table->double('paid', 8,2)->default(0);
               $table->double('return', 8,2)->default(0);
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
          Schema::dropIfExists('sell_payments');
     }
}
