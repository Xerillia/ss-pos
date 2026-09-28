<?php

namespace Database\Seeders;

use App\Models\Expenditure;
use App\Models\ExpenseCategory;
use App\Models\User;
use Illuminate\Database\Seeder;

class ExpenditureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::count() === 0) {
            User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
            ]);
        }

        // Ensure default categories exist
        if (ExpenseCategory::count() === 0) {
            $this->call(ExpenseCategorySeeder::class);
        }

        // Generate 50 realistic expenditure entries
        Expenditure::factory()->count(50)->create();
    }
}
