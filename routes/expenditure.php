<?php

use App\Http\Controllers\ExpenditureController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('expenditures')->name('expenditure.')->group(function () {
    Route::get('/', [ExpenditureController::class, 'index'])->name('expenditures');
});
