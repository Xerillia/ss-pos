<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Attributes\UseModel;
use Illuminate\Database\Eloquent\Factories\Factory;

#[UseModel(Product::class)]
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'capital' => $this->faker->randomFloat(2, 1, 30) * 1000,
            'price' => $this->faker->randomFloat(2, 31, 100) * 1000,
            'quantity' => $this->faker->numberBetween(1, 100),
        ];
    }
}
