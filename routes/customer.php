<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/', [CustomerController::class, 'index'])->name('customers');

    Route::get('/add', [CustomerController::class, 'create'])->name('createCustomer');
    Route::post('/add', [CustomerController::class, 'store'])->name('storeCustomer');

    Route::get('/show/{customer}', [CustomerController::class, 'show'])->name('showCustomer');

    Route::get('/edit/{customer}', [CustomerController::class, 'edit'])->name('editCustomer');
    Route::put('/edit/{customer}', [CustomerController::class, 'update'])->name('updateCustomer');

    Route::delete('/delete/{customer}', [CustomerController::class, 'destroy'])->name('destroyCustomer');
});
