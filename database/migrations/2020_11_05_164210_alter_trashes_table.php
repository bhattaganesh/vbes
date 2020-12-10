<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTrashesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('trashes', function (Blueprint $table) {
        $table->enum('isInbox',['yes','no']);
        $table->enum('isImp',['yes','no'])->default('no');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('trashes', function (Blueprint $table) {
            $table->dropColumn('isInbox');
            $table->dropColumn('isImp');
        });
    }
}
