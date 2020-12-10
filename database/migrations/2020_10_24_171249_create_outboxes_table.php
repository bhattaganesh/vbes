<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutboxesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('outboxes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mail_id')->constrained('mails','id')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->string('sender_id');
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
        Schema::dropIfExists('outboxes');
    }
}
