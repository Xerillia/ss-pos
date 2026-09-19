<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/', [CustomerController::class, 'index'])->name('customerIndex');
});
