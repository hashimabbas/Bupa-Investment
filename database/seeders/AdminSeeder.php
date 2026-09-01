<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure permissions exist
        $this->call(PermissionSeeder::class);

        $user = User::updateOrCreate(
            ['email' => 'hashim267303@gmail.com'],
            [
                'name' => 'Hashim Abbas',
                'password' => Hash::make('2673031992'),
                'role' => 'admin',
                'status' => 'active',
                'job_title' => 'Super Administrator',
            ]
        );

        // Assign all permissions
        $permissions = Permission::all();
        $user->permissions()->sync($permissions->pluck('id'));

        $this->command->info('Super Admin created successfully: hashim267303@gmail.com');
    }
}
