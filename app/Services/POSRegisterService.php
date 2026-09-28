<?php

namespace App\Services;

use App\Enums\PaymentMethod;
use App\Models\Expenditure;
use App\Models\Sale;
use Carbon\CarbonInterface;

class POSRegisterService
{
    /**
     * Calculate expected drawer balance for a given shift / time range.
     */
    public function calculateExpectedCash(
        CarbonInterface|string $startDate,
        CarbonInterface|string $endDate,
        float $startingFloat = 0.00
    ): array {
        $totalCashSales = (float) Sale::query()
            ->dateRange($startDate, $endDate)
            ->where('payment_method', PaymentMethod::CASH)
            ->sum('paid_amount');

        $totalCashExpenditures = (float) Expenditure::query()
            ->dateRange($startDate, $endDate)
            ->where('payment_method', PaymentMethod::CASH)
            ->sum('amount');

        $expectedCash = $startingFloat + $totalCashSales - $totalCashExpenditures;

        return [
            'starting_float' => $startingFloat,
            'total_cash_sales' => $totalCashSales,
            'total_cash_expenditures' => $totalCashExpenditures,
            'expected_cash' => $expectedCash,
        ];
    }
}
