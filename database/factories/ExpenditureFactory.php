<?php

namespace Database\Factories;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Models\Expenditure;
use App\Models\ExpenseCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Expenditure>
 */
class ExpenditureFactory extends Factory
{
    protected $model = Expenditure::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'expense_number' => null,
            'expense_category_id' => ExpenseCategory::inRandomOrder()->value('id') ?? ExpenseCategory::factory(),
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'title' => $this->faker->words(3, true),
            'amount' => $this->faker->randomFloat(2, 10, 2500),
            'payment_method' => $this->faker->randomElement(PaymentMethod::cases()),
            'expense_date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'status' => $this->faker->randomElement(PaymentStatus::cases()),
            'reference_number' => $this->faker->optional(0.7)->bothify('REF-#####'),
            'attachment_path' => null,
            'notes' => $this->faker->optional(0.5)->sentence(),
        ];
    }
}
