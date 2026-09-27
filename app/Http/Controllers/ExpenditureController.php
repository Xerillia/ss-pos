<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpenditureRequest;
use App\Models\Expenditure;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenditureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Expenditure::with(['category', 'user:id,name'])
            ->when($request->search, function ($q, $search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('title', 'LIKE', "%{$search}%")
                        ->orWhere('expense_number', 'LIKE', "%{$search}%")
                        ->orWhere('reference_number', 'LIKE', "%{$search}%");
                });
            })
            ->when($request->expense_category_id, fn ($q, $id) => $q->where('expense_category_id', $id))
            ->when($request->start_date && $request->end_date, fn ($q) => $q->dateRange($request->start_date, $request->end_date)
            );

        return Inertia::render('expenditures/expenditures', [
            'expenditures' => $query->latest('expense_date')->paginate($request->input('per_page', 15))->withQueryString(),
            'categories' => ExpenseCategory::active()->select('id', 'name')->get(),
            'filters' => $request->only(['search', 'expense_category_id', 'start_date', 'end_date']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpenditureRequest $request)
    {
        $validated = $request->validated();

        $validated['user_id'] = $request->user()->id;

        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('expenditures/receipts', 'public');
            $validated['attachment_path'] = $path;
        }

        Expenditure::create($validated);

        return redirect()->back()->with('success', 'Expenditure created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expenditure $expenditure)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expenditure $expenditure)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expenditure $expenditure)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expenditure $expenditure)
    {
        $expenditure->delete();

        return redirect()->back()->with('success', 'Expenditure deleted successfully.');
    }
}
