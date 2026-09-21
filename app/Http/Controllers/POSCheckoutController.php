<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatus;
use App\Http\Requests\StoreSaleRequest;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class POSCheckoutController extends Controller
{
    /**
     * Handle POS checkout process
     */
    public function store(StoreSaleRequest $request): JsonResponse
    {
        $validated = $request->validated();

        // process items, lock rows, verify stock, and prepare records
        $sale = DB::transaction(function () use ($validated, $request) {
            $subtotal = 0;
            $saleProductsData = [];

            foreach ($validated['items'] as $item) {
                // lock to prevent race conditions
                $product = Product::whereId($item['product_id'])
                    ->lockForUpdate()
                    ->firstOrFail();

                if ($product->quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for product: {$product->name}");
                }

                $quantity = $item['quantity'];
                $grossTotal = $product->price * $quantity;

                // discounts
                $unitDiscount = $item['unit_discount'] ?? 0.00;
                $flatDiscount = $item['flat_discount'] ?? 0.00;

                // cap
                $unitDiscount = min($unitDiscount, $product->price);

                // total discounts
                $totalDiscount = ($unitDiscount * $quantity) + $flatDiscount;
                $totalDiscount = min($totalDiscount, $grossTotal);

                $itemTotal = $grossTotal - $totalDiscount;
                $subtotal += $itemTotal;

                // deduct stock
                $product->decrement('quantity', $item['quantity']);

                // batch data
                $saleProductsData[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_sku' => $product->sku,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'unit_discount' => $unitDiscount,
                    'flat_discount' => $flatDiscount,
                    'total_price' => $itemTotal,
                ];
            }

            // financial total
            $taxAmount = $validated['tax_amount'] ?? 0.00;
            $discountAmount = $validated['discount_amount'] ?? 0.00;
            $totalAmount = ($subtotal + $taxAmount) - $discountAmount;

            $paidAmount = $validated['paid_amount'];

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
                'sale_number' => $validated['sale_number'] ?? null,
                'user_id' => $request->user()?->id,
                'customer_id' => $validated['customer_id'] ?? null,
                'status' => 'completed',
                'payment_status' => $paymentStatus,
                'payment_method' => $validated['payment_method'],
                'subtotal_amount' => $subtotal,
                'tax_amount' => $taxAmount,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'currency' => $validated['currency'] ?? 'IDR',
                'paid_amount' => $paidAmount,
                'change_amount' => $changeAmount,
                'debt_amount' => $debtAmount,
                'notes' => $validated['notes'] ?? null,
            ]);

            // create SaleProduct records
            $sale->saleProducts()->createMany($saleProductsData);

            return $sale;
        });

        return response()->json([
            'success' => true,
            'message' => 'Sale completed successfully.',
            'data' => $sale->load('saleProducts'),
        ], 201);
    }
}
