<?php

use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/pos', [SaleController::class, 'pos'])->name('pos.pos');

    Route::prefix('/sales')->name('sales.')->group(function () {
        Route::get('/', [SaleController::class, 'index'])->name('sales');
        Route::get('/{sale}', [SaleController::class, 'show'])->name('showSale');
        Route::get('/edit/{sale}', [SaleController::class, 'edit'])->name('editSale');
        Route::put('/edit/{sale}', [SaleController::class, 'update'])->name('updateSale');
        Route::delete('/delete/{sale}', [SaleController::class, 'destroy'])->name('destroySale');
    });

});
