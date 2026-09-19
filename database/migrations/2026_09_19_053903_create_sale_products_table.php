<?php

use App\Models\Product;
use App\Models\Sale;
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
        Schema::create('sale_products', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(Sale::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Product::class)->nullable()->constrained()->nullOnDelete();

            // product snapshot
            $table->string('product_name');
            $table->string('product_sku')->nullable();

            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('unit_discount', 10, 2)->default(0.00);
            $table->decimal('flat_discount', 10, 2)->default(0.00);
            $table->decimal('total_price', 10, 2); // ((price - unit_discount) * qty) - flat

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_products');
    }
};
