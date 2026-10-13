<?php

use App\Models\SaleProduct;
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
        Schema::table('refunds', function (Blueprint $table) {
            $table->dropConstrainedForeignIdFor(SaleProduct::class);
            $table->foreignIdFor(SaleProduct::class)->after('id')->nullable()->constrained()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('refunds', function (Blueprint $table) {
            $table->dropConstrainedForeignIdFor(SaleProduct::class);
            $table->foreignIdFor(SaleProduct::class)->after('id')->constrained()->cascadeOnDelete();
        });
    }
};
