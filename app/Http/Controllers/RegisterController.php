<?php

namespace App\Http\Controllers;

use App\Services\POSRegisterService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function checker(Request $request, POSRegisterService $service)
    {
        $startDate = $request->input('start_date', now()->startOfDay()->toDateTimeString());
        $endDate = $request->input('end_date', now()->endOfDay()->toDateTimeString());
        $startingFloat = (float) $request->input('starting_float', 0.00);

        $summary = $service->calculateExpectedCash($startDate, $endDate, $startingFloat);

        return Inertia::render('register-checker', [
            'summary' => $summary,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'starting_float' => $startingFloat,
            ],
        ]);
    }
}
