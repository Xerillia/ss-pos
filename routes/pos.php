<?php

use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('pos')->name('pos.')->group(function () {
    Route::get('/', [SaleController::class, 'index'])->name('posIndex');
});
