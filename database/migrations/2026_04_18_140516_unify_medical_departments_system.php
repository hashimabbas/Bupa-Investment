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
        // 1. Rename specialties to departments
        Schema::rename('specialties', 'departments');

        // 2. Rename pivot table
        Schema::rename('partner_specialty', 'partner_department');

        // 3. Update pivot table columns
        Schema::table('partner_department', function (Blueprint $table) {
            $table->renameColumn('specialty_id', 'department_id');
        });

        // 4. Update products table
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('department_id')->nullable()->constrained('departments')->onDelete('set null');
        });

        // 5. Data Migration: Move existing product categories to Department table
        $products = DB::table('products')->get();
        foreach ($products as $product) {
            if ($product->category_en) {
                $departmentId = DB::table('departments')->updateOrInsert(
                    ['name_en' => $product->category_en, 'name_ar' => $product->category_ar ?? $product->category_en],
                    ['created_at' => now(), 'updated_at' => now()]
                );
                
                // Get the ID (updateOrInsert doesn't return ID unfortunately)
                $department = DB::table('departments')
                    ->where('name_en', $product->category_en)
                    ->first();
                
                DB::table('products')
                    ->where('id', $product->id)
                    ->update(['department_id' => $department->id]);
            }
        }

        // 6. Remove old columns from products
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['category_en', 'category_ar']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('category_en')->nullable();
            $table->string('category_ar')->nullable();
        });

        // Reverse data migration (approximate)
        $products = DB::table('products')->whereNotNull('department_id')->get();
        foreach ($products as $product) {
            $dept = DB::table('departments')->find($product->department_id);
            if ($dept) {
                DB::table('products')->where('id', $product->id)->update([
                    'category_en' => $dept->name_en,
                    'category_ar' => $dept->name_ar,
                ]);
            }
        }

        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropColumn('department_id');
        });

        Schema::table('partner_department', function (Blueprint $table) {
            $table->renameColumn('department_id', 'specialty_id');
        });

        Schema::rename('partner_department', 'partner_specialty');
        Schema::rename('departments', 'specialties');
    }
};
