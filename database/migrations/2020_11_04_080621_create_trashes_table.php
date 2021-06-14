<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrashesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trashes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mail_id')->constrained('mails','id')->onDelete('CASCADE')->onUpdate('CASCADE');
            // $table->string('user_name');
            $table->foreignId('user_id')->constrained('users','id')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->enum('isInbox',['yes','no']);
            $table->enum('isImp',['yes','no'])->default('no');
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
        Schema::dropIfExists('trashes');
    }
}
