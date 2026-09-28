<?php

namespace Database\Factories;

use App\Models\ExpenseCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ExpenseCategory>
 */
class ExpenseCategoryFactory extends Factory
{
    protected $model = ExpenseCategory::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Office Supplies' => 'OFF',
            'Utilities' => 'UTL',
            'Rent & Lease' => 'RNT',
            'Travel & Transport' => 'TRV',
            'Software & Subscriptions' => 'SFT',
            'Marketing & Ads' => 'MKT',
            'Maintenance & Repairs' => 'MNT',
            'Salaries & Wages' => 'PAY',
        ];

        $name = $this->faker->unique()->randomElement(array_keys($categories));

        return [
            'name' => $name,
            'description' => $this->faker->sentence(),
            'code' => $categories[$name].'-'.$this->faker->numberBetween(10, 99),
            'is_active' => true,
        ];
    }
}
