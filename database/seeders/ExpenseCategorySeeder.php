<?php

namespace Database\Seeders;

use App\Models\ExpenseCategory;
use Illuminate\Database\Seeder;

class ExpenseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Office Supplies', 'code' => 'OFF-01', 'description' => 'Stationery, paper, printer ink, and desk supplies.'],
            ['name' => 'Utilities', 'code' => 'UTL-01', 'description' => 'Electricity, water, gas, and internet bills.'],
            ['name' => 'Rent & Lease', 'code' => 'RNT-01', 'description' => 'Property lease and facility rentals.'],
            ['name' => 'Travel & Transport', 'code' => 'TRV-01', 'description' => 'Flight tickets, taxi fare, fuel, and hotel stays.'],
            ['name' => 'Software & Subscriptions', 'code' => 'SFT-01', 'description' => 'SaaS tools, cloud hosting, and software licenses.'],
            ['name' => 'Marketing & Ads', 'code' => 'MKT-01', 'description' => 'Social media ads, printing promotional materials.'],
            ['name' => 'Maintenance & Repairs', 'code' => 'MNT-01', 'description' => 'Hardware repairs, building maintenance.'],
        ];

        foreach ($categories as $category) {
            ExpenseCategory::firstOrCreate(
                ['code' => $category['code']],
                array_merge($category, ['is_active' => true])
            );
        }
    }
}
