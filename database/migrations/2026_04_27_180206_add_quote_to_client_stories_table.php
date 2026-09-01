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
            $table->text('quote_en')->nullable();
            $table->text('quote_ar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('client_stories', function (Blueprint $table) {
            $table->dropColumn(['quote_en', 'quote_ar']);
        });
    }
};
