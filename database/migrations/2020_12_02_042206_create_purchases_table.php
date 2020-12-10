<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('purchases', function (Blueprint $table) {
               $table->id();
               $table->string('code');
               $table->foreignId('store_id')->constrained();
               $table->foreignId('user_id')->constrained();
               $table->foreignId('supplier_id')->constrained();
               $table->string('receipt_no');
               // $table->string('supllier_receipt')->nullable(false);
               $table->double('amount', 8,2)->default(0);
               $table->double('tax', 8,2)->default(0);
               $table->double('transport', 8,2)->default(0);
               $table->boolean('approved')->default(false);
               $table->boolean('is_stock')->default(false);
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
          Schema::dropIfExists('purchases');
     }
}
