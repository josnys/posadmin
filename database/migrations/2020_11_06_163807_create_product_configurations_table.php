<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductConfigurationsTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::create('product_configurations', function (Blueprint $table) {
               $table->id();
               $table->foreignId('product_id')->constrained();
               $table->foreignId('presentation_id')->constrained();
               $table->foreignId('agency_id')->constrained();
               $table->string('code')->nullable(false);
               $table->boolean('is_transformable')->default(false);
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
          Schema::dropIfExists('product_configurations');
     }
}
