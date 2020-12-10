<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImportantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('importants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inbox_id')->nullable()->constrained('inboxes','id')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->foreignId('outbox_id')->nullable()->constrained('outboxes','id')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->foreignId('trash_id')->nullable()->constrained('trashes','id')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->foreignId('draft_id')->nullable()->constrained('drafts','id')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->string('user_name');
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
        Schema::dropIfExists('importants');
    }
}
