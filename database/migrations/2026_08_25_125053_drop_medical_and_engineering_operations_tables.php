<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Note: `customers` and `customer_sites` are intentionally kept — they
     * back the public client-portal registration/login flow, independent of
     * the admin medical/engineering operations screens removed here.
     */
    public function up(): void
    {
        Schema::dropIfExists('task_parts_used');
        Schema::dropIfExists('engineering_task_logs');
        Schema::dropIfExists('engineering_tasks');
        Schema::dropIfExists('engineer_schedules');
        Schema::dropIfExists('maintenance_visits');
        Schema::dropIfExists('maintenance_tickets');
        Schema::dropIfExists('equipment');
        Schema::dropIfExists('engineers');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('engineers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('employee_code')->unique();
            $table->string('specialization');
            $table->string('phone');
            $table->string('region');
            $table->string('availability_status')->default('available');
            $table->json('certifications')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('equipment', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->string('product_name');
            $table->string('manufacturer');
            $table->string('model');
            $table->string('serial_number')->unique();
            $table->date('installation_date');
            $table->date('warranty_expiry');
            $table->string('ownership_type')->default('owned');
            $table->string('status')->default('active');
            $table->string('maintenance_schedule')->default('none');
            $table->dateTime('last_maintenance_at')->nullable();
            $table->dateTime('next_maintenance_at')->nullable();
            $table->string('location_inside_facility');
            $table->text('notes')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('maintenance_tickets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->foreignUuid('equipment_id')->constrained('equipment')->cascadeOnDelete();
            $table->foreignUuid('engineer_id')->nullable()->constrained('engineers')->nullOnDelete();
            $table->string('type');
            $table->string('priority')->default('medium');
            $table->string('status')->default('open');
            $table->text('issue_description');
            $table->dateTime('scheduled_date');
            $table->dateTime('sla_deadline')->nullable();
            $table->integer('response_time_minutes')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('maintenance_visits', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('ticket_id')->constrained('maintenance_tickets')->cascadeOnDelete();
            $table->foreignUuid('engineer_id')->constrained('engineers')->cascadeOnDelete();
            $table->dateTime('visit_date');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->dateTime('arrival_at')->nullable();
            $table->dateTime('departure_at')->nullable();
            $table->text('actions_taken');
            $table->json('replaced_parts')->nullable();
            $table->json('attachments')->nullable();
            $table->json('photos_before')->nullable();
            $table->json('photos_after')->nullable();
            $table->text('recommendations')->nullable();
            $table->text('client_signature')->nullable();
            $table->boolean('follow_up_required')->default(false);
            $table->timestamps();
        });

        Schema::create('engineer_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('engineer_id')->constrained('engineers')->onDelete('cascade');
            $table->date('schedule_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->boolean('available')->default(true);
            $table->string('region')->nullable();
            $table->json('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('engineering_tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('maintenance_ticket_id')->constrained('maintenance_tickets')->cascadeOnDelete();
            $table->foreignUuid('engineer_id')->nullable()->constrained('engineers')->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('task_type')->default('preventive');
            $table->string('priority')->default('medium');
            $table->string('status')->default('pending');
            $table->integer('estimated_duration_minutes')->nullable();
            $table->integer('actual_duration_minutes')->nullable();
            $table->dateTime('scheduled_start')->nullable();
            $table->dateTime('scheduled_end')->nullable();
            $table->dateTime('started_at')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->dateTime('paused_at')->nullable();
            $table->boolean('requires_followup')->default(false);
            $table->date('followup_date')->nullable();
            $table->text('completion_notes')->nullable();
            $table->text('internal_notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('engineering_task_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('task_id')->constrained('engineering_tasks')->cascadeOnDelete();
            $table->foreignUuid('engineer_id')->nullable()->constrained('engineers')->nullOnDelete();
            $table->string('action');
            $table->string('old_status')->nullable();
            $table->string('new_status')->nullable();
            $table->text('notes')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('task_parts_used', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('task_id')->constrained('engineering_tasks')->cascadeOnDelete();
            $table->string('part_name');
            $table->integer('quantity')->default(1);
            $table->string('serial_number')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }
};
