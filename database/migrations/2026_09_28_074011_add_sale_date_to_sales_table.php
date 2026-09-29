<?php

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
        // set initially to nullable
        Schema::table('sales', function (Blueprint $table) {
            $table->dateTime('sale_date')->nullable()->after('notes');
        });

        // handle missing values
        DB::statement('UPDATE sales SET sale_date = COALESCE(created_at, NOW()) WHERE sale_date IS NULL');

        // update
        Schema::table('sales', function (Blueprint $table) {
            $table->dateTime('sale_date')->nullable(false)->change();
            $table->index('sale_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn('sale_date');
        });
    }
};
