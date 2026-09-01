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
        // 1. Customers
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('type'); // hospital, clinic, laboratory, government, private
            $table->string('contact_person');
            $table->string('phone');
            $table->string('email')->unique();
            $table->text('address');
            $table->string('city');
            $table->string('country')->default('Sudan');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('account_manager_id')->nullable()->constrained('users')->nullOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });

        // 2. Engineers
        Schema::create('engineers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('employee_code')->unique();
            $table->string('specialization');
            $table->string('phone');
            $table->string('region');
            $table->string('availability_status')->default('available'); // available, busy, on_leave
            $table->json('certifications')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // 3. Equipment
        Schema::create('equipment', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->string('product_name');
            $table->string('manufacturer');
            $table->string('model');
            $table->string('serial_number')->unique();
            $table->date('installation_date');
            $table->date('warranty_expiry');
            $table->string('ownership_type')->default('owned'); // owned, leased, under_contract
            $table->string('status')->default('active'); // active, under_maintenance, inactive
            $table->string('maintenance_schedule')->default('none'); // monthly, quarterly, yearly, none
            $table->dateTime('last_maintenance_at')->nullable();
            $table->dateTime('next_maintenance_at')->nullable();
            $table->string('location_inside_facility');
            $table->text('notes')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        // 4. Maintenance Tickets
        Schema::create('maintenance_tickets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->foreignUuid('equipment_id')->constrained('equipment')->cascadeOnDelete();
            $table->foreignUuid('engineer_id')->nullable()->constrained('engineers')->nullOnDelete();
            $table->string('type'); // preventive, emergency, installation, inspection
            $table->string('priority')->default('medium'); // low, medium, high, urgent
            $table->string('status')->default('open'); // open, assigned, in_progress, completed, cancelled
            $table->text('issue_description');
            $table->dateTime('scheduled_date');
            $table->dateTime('sla_deadline')->nullable();
            $table->integer('response_time_minutes')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // 5. Maintenance Visits
        Schema::create('maintenance_visits', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('ticket_id')->constrained('maintenance_tickets')->cascadeOnDelete();
            $table->foreignUuid('engineer_id')->constrained('engineers')->cascadeOnDelete();
            $table->dateTime('visit_date');
            $table->text('actions_taken');
            $table->json('replaced_parts')->nullable();
            $table->json('attachments')->nullable(); // For photos, reports, logs
            $table->text('recommendations')->nullable();
            $table->text('client_signature')->nullable();
            $table->boolean('follow_up_required')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_visits');
        Schema::dropIfExists('maintenance_tickets');
        Schema::dropIfExists('equipment');
        Schema::dropIfExists('engineers');
        Schema::dropIfExists('customers');
    }
};
