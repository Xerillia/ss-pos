<?php

use App\Models\ExpenseCategory;
use App\Models\User;
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
        Schema::create('expense_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('code')->nullable();
            $table->boolean('is_active')->default(true);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('expenditures', function (Blueprint $table) {
            $table->id();
            $table->string('expense_number')->unique();
            $table->foreignIdFor(ExpenseCategory::class)->nullable()->constrained()->nullOnDelete();
            $table->foreignIdFor(User::class)->constrained();

            $table->string('title');
            $table->decimal('amount', 15, 2);
            $table->string('payment_method')->default('cash');
            $table->dateTime('expense_date');

            $table->string('status')->default('paid');
            $table->string('reference_number')->nullable();
            $table->string('attachment_path')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index('expense_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenditures');
        Schema::dropIfExists('expense_categories');
    }
};
