<?php

namespace App\Http\Controllers;

use App\Enums\SaleStatus;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display POS
     */
    public function pos(Request $request)
    {
        $search = $request->input('search', '');

        $products = Product::all(['id', 'sku', 'name', 'quantity', 'unit', 'price']);
        $customers = Customer::all(['id', 'name']);
        $sales = Sale::query()
            ->with(['customer:id,name', 'saleProducts'])
            ->when($search, function ($query, $search) {
                $query->where('sale_number', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('pos/pos', [
            'products' => $products,
            'customers' => $customers,
            'sales' => $sales,
        ]);
    }

    /**
     * Display a paginated listing of sales.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');

        $sales = Sale::query()
            ->with(['user:id,name', 'customer:id,name'])
            ->when($search, function ($query, $search) {
                $query->where('sale_number', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('sales/sales', [
            'sales' => $sales,
            'filters' => [
                'search' => $search,
                'per_page' => (int) $perPage,
            ],
        ]);
    }

    /**
     * Display sale details
     */
    public function show(Sale $sale)
    {
        $sale->load(['user:id,name', 'customer:id,name', 'saleProducts']);

        return Inertia::render('sales/show-sale', [
            'sale' => $sale,
        ]);
    }

    /**
     * Update sale notes or status.
     */
    public function update(Request $request, Sale $sale)
    {
        $validated = $request->validate([
            'notes' => ['nullable', 'string', 'max:500'],
            'status' => ['required', 'string', Rule::enum(SaleStatus::class)],
        ]);

        $sale->update($validated);

        return back()->with('success', 'Sale updated successfully.');
    }

    /**
     * Cancel a sale and restore stock.
     */
    public function destroy(Sale $sale)
    {
        DB::transaction(function () use ($sale) {
            // Restore inventory stock for each product in the sale
            foreach ($sale->saleProducts as $saleProduct) {
                if ($saleProduct->product) {
                    $saleProduct->product->increment('quantity', $saleProduct->quantity);
                }
            }

            // Delete associated line items first
            $sale->saleProducts()->delete();

            // Delete the primary sale record
            $sale->delete();
        });

        return redirect()->route('sales.sales')->with('success', 'Sale deleted and inventory restored.');
    }
}
