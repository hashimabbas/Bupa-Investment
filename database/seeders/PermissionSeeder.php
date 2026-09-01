<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = [
            'products' => 'Medical Products Catalog',
            'partners' => 'Global Partners & Manufacturers',
            'departments' => 'Medical Departments',
            'services' => 'Services & Solutions',
            'gallery' => 'Gallery Management',
            'hero_slides' => 'Homepage Hero Slider',
            'offers' => 'Offers & Promotions',
            'users' => 'Admin Users & Permissions',
            'testimonials' => 'Client Testimonials & Videos',
            'contact_messages' => 'Contact Form Messages',
        ];

        $actions = [
            'view' => 'Can view items',
            'create' => 'Can create new items',
            'edit' => 'Can edit existing items',
            'delete' => 'Can delete items',
        ];

        foreach ($modules as $moduleKey => $moduleName) {
            foreach ($actions as $actionKey => $actionName) {
                \App\Models\Permission::updateOrCreate(
                    ['name' => "{$moduleKey}.{$actionKey}"],
                    [
                        'module' => $moduleKey,
                        'description' => "{$actionName} in {$moduleName}",
                    ]
                );
            }
        }
    }

}
