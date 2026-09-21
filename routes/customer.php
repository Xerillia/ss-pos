<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/', [CustomerController::class, 'index'])->name('customers');

    Route::get('/add', [CustomerController::class, 'create'])->name('createCustomer');
    Route::post('/add', [CustomerController::class, 'store'])->name('storeCustomer');

    Route::delete('/delete/{customer}', [CustomerController::class, 'destroy'])->name('destroyCustomer');
});
