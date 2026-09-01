<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\CustomerSite;
use Illuminate\Database\Seeder;

class CustomerSiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = Customer::all();

        foreach ($customers as $customer) {
            $sites = [
                ['name' => 'Main Building - المبنى الرئيسي'],
                ['name' => 'Emergency Room - قسم الطوارئ'],
                ['name' => 'Radiology Dept - قسم الأشعة'],
                ['name' => 'ICU - العناية المكثفة'],
            ];

            foreach ($sites as $site) {
                CustomerSite::create([
                    'customer_id' => $customer->id,
                    'name' => $site['name'],
                ]);
            }
        }
    }
}
