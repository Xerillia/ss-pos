<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('inventory')->name('product.')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('inventory');

    Route::get('/add', [ProductController::class, 'create'])->name('createItem');
    Route::post('/add', [ProductController::class, 'store'])->name('storeItem');

    Route::get('/show/{product}', [ProductController::class, 'show'])->name('showItem');

    Route::get('/edit/{product}', [ProductController::class, 'edit'])->name('editItem');
    Route::put('/edit/{product}', [ProductController::class, 'update'])->name('updateItem');

    Route::delete('/delete/{product}', [ProductController::class, 'destroy'])->name('destroyItem');
});
