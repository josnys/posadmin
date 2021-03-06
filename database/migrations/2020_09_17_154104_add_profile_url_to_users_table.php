<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProfileUrlToUsersTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
          Schema::table('users', function (Blueprint $table) {
               $table->string('profile_url')->after('multi_connect')->nullable();
          });
     }

     /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
          Schema::table('users', function (Blueprint $table) {
               if(Schema::hasColumn('profile_url')){
                    $table->dropColumn('profile_url');
               }
          });
     }
}
