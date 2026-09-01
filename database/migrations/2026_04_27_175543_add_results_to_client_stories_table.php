<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('client_stories', function (Blueprint $table) {
            $table->text('challenge_en')->nullable();
            $table->text('challenge_ar')->nullable();
            $table->text('result_en')->nullable();
            $table->text('result_ar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('client_stories', function (Blueprint $table) {
            $table->dropColumn(['challenge_en', 'challenge_ar', 'result_en', 'result_ar']);
        });
    }
};
