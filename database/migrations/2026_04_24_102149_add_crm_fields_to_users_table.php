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
        Schema::table('users', function (Blueprint $table) {
            $table->string('job_title')->nullable()->after('email');
            $table->string('role')->default('sales')->after('job_title'); // admin, manager, sales, technician
            $table->string('phone')->nullable()->after('role');
            $table->string('status')->default('active')->after('phone'); // active, suspended, invited
            $table->string('avatar')->nullable()->after('status');
            $table->text('bio')->nullable()->after('avatar');
            $table->timestamp('last_login_at')->nullable()->after('bio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['job_title', 'role', 'phone', 'status', 'avatar', 'bio', 'last_login_at']);
        });
    }
};
