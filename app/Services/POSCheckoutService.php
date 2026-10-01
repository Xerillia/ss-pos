<?php

namespace App\Services;

use App\Enums\PaymentStatus;
use App\Exceptions\InsufficientStockException;
use App\Models\Product;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class POSCheckoutService
{
    /**
     * Process POS checkout logic inside a single transaction.
     *
     * @throws InsufficientStockException
     */
    public function execute(array $data, ?User $user = null): Sale
    {
        // process items, lock rows, verify stock, and prepare records
        return DB::transaction(function () use ($data, $user) {
            $consolidatedItems = $this->consolidateItems($data['items']);

            $subtotal = 0;
            $saleProductsData = [];

            foreach ($consolidatedItems as $item) {
                // lock to prevent race conditions
                $product = Product::whereId($item['product_id'])
                    ->lockForUpdate()
                    ->firstOrFail();

                if ($product->quantity < $item['quantity']) {
                    throw new InsufficientStockException($product->name, $product->id);
                }

                $quantity = $item['quantity'];
                $grossTotal = $product->price * $quantity;

                // discounts
                $unitDiscount = min($item['unit_discount'] ?? 0.00, $product->price);
                $flatDiscount = $item['flat_discount'] ?? 0.00;

                // total discounts
                $totalDiscount = min(($unitDiscount * $quantity) + $flatDiscount, $grossTotal);

                $itemTotal = $grossTotal - $totalDiscount;
                $subtotal += $itemTotal;

                // deduct stock
                $product->decrement('quantity', $quantity);

                // batch data
                $saleProductsData[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_sku' => $product->sku,
                    'product_unit' => $product->unit,
                    'quantity' => $quantity,
                    'unit_price' => $product->price,
                    'unit_discount' => $unitDiscount,
                    'flat_discount' => $flatDiscount,
                    'total_price' => $itemTotal,
                ];
            }

            // financial total
            $taxAmount = $data['tax_amount'] ?? 0.00;
            $discountAmount = $data['discount_amount'] ?? 0.00;
            $totalAmount = max(0, ($subtotal + $taxAmount) - $discountAmount);

            $paidAmount = $data['paid_amount'];

            // debt, change, payment status
            if ($paidAmount >= $totalAmount) {
                $changeAmount = $paidAmount - $totalAmount;
                $debtAmount = 0.00;
                $paymentStatus = PaymentStatus::PAID;
            } else {
                $changeAmount = 0.00;
                $debtAmount = $totalAmount - $paidAmount;
                $paymentStatus = $paidAmount > 0 ? PaymentStatus::PARTIAL : PaymentStatus::UNPAID;
            }

            // create sale record
            $sale = Sale::create([
                'sale_number' => $data['sale_number'] ?? $this->generateSaleNumber(),
                'user_id' => $user?->id,
                'customer_id' => $data['customer_id'] ?? null,
                'status' => 'completed',
                'payment_status' => $paymentStatus,
                'payment_method' => $data['payment_method'],
                'subtotal_amount' => $subtotal,
                'tax_amount' => $taxAmount,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'currency' => $data['currency'] ?? 'IDR',
                'paid_amount' => $paidAmount,
                'change_amount' => $changeAmount,
                'debt_amount' => $debtAmount,
                'notes' => $data['notes'] ?? null,
                'sale_date' => $data['sale_date'],
            ]);

            // create SaleProduct records
            $sale->saleProducts()->createMany($saleProductsData);

            return $sale;
        });
    }

    /**
     * Consolidate duplicate products in the request payload.
     */
    protected function consolidateItems(array $items): array
    {
        $consolidated = [];

        foreach ($items as $item) {
            $id = $item['product_id'];
            if (! isset($consolidated[$id])) {
                $consolidated[$id] = $item;
                $consolidated[$id]['unit_discount'] = $item['unit_discount'] ?? 0.00;
                $consolidated[$id]['flat_discount'] = $item['flat_discount'] ?? 0.00;
            } else {
                $consolidated[$id]['quantity'] += $item['quantity'];
                $consolidated[$id]['flat_discount'] += ($item['flat_discount'] ?? 0.00);
            }
        }

        return array_values($consolidated);
    }

    /**
     * Fallback server-side sale number generator.
     */
    protected function generateSaleNumber(): string
    {
        return 'INV-'.now()->format('Ymd').'-'.strtoupper(Str::random(5));
    }
}
