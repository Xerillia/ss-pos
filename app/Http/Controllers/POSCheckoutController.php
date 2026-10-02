<?php

namespace App\Http\Controllers;

use App\Exceptions\InsufficientStockException;
use App\Http\Requests\StoreSaleRequest;
use App\Services\POSCheckoutService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class POSCheckoutController extends Controller
{
    /**
     * Handle POS checkout process
     */
    public function store(StoreSaleRequest $request, POSCheckoutService $checkoutService): JsonResponse
    {
        try {
            $sale = $checkoutService->execute($request->validated(), $request->user());

            return response()->json([
                'success' => true,
                'message' => 'Sale completed successfully.',
                'data' => $sale->load('saleProducts'),
            ], 201);
        } catch (InsufficientStockException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'product_id' => $e->getProductId(),
            ], 422);

        } catch (\Throwable $e) {
            Log::error('POS Checkout Failed', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()?->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred while processing the transaction.',
            ], 500);
        }
    }
}
