<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();

        return Inertia::render('customer/customers', [
            'customers' => $customers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('customer/create-customer');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerRequest $request)
    {
        $customer = Customer::create($request->validated());

        return redirect()
            ->back()
            ->with('success', 'Customer '.$customer->name.' added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer, Request $request)
    {
        $customer->append(['total_debt', 'total_order']);

        return Inertia::render('customers/show-customer', [
            'customer' => $customer,
            'sales' => $customer->sales()
                ->select(['id', 'customer_id', 'sale_number', 'total_amount', 'payment_status', 'created_at'])
                ->withCount('saleProducts as unique_products_count')
                ->latest()
                ->paginate($request->input('per_page', 10))
                ->withQueryString(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        return Inertia::render('customer/edit-customer', [
            'customer' => $customer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update($request->validated());

        return redirect()
            ->back()
            ->with('success', 'Customer '.$customer->name.' updated successfully.',
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()
            ->back()
            ->with('success', 'Customer '.$customer->name.' deleted successfully.',
            );
    }
}
