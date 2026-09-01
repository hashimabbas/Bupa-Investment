<?php

namespace Database\Seeders;

use App\Models\Partner;
use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentMigratorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $partners = Partner::all();

        foreach ($partners as $partner) {
            // These would have been set in previous steps or migrations
            // This seeder was for a specific migration step earlier.
            // Keeping it updated just in case.
            $en_specs = $partner->specialties_en ?? [];
            $ar_specs = $partner->specialties_ar ?? [];

            foreach ($en_specs as $index => $en_name) {
                $ar_name = $ar_specs[$index] ?? $en_name;

                $department = Department::firstOrCreate(
                    ['name_en' => $en_name, 'name_ar' => $ar_name]
                );

                $partner->departments()->syncWithoutDetaching([$department->id]);
            }
        }
    }
}
