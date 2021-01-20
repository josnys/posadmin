<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurrenciesTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('currencies', function (Blueprint $table) {
               $table->id();
               $table->string('name')->nullable(false);
               $table->string('code')->unique();
               $table->double('sell_rate', 8,2)->default(1);
               $table->double('buy_rate', 8,2)->default(1);
               $table->boolean('is_default')->default(false);
               $table->foreignId('user_id')->constrained();
               $table->boolean('status')->default(false);
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
          Schema::dropIfExists('currencies');
     }
}
