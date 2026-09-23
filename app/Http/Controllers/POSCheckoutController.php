<?php

namespace App\Http\Controllers;

use App\Exceptions\InsufficientStockException;
use App\Http\Requests\StoreSaleRequest;
use App\POSCheckoutService;
use Illuminate\Http\JsonResponse;

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
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
