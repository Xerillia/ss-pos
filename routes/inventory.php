<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('inventory', [ProductController::class, 'index'])->name('product.inventory');

    Route::get('inventory/add', [ProductController::class, 'create'])->name('product.createItem');
    Route::post('inventory/add', [ProductController::class, 'store'])->name('product.storeItem');

    Route::get('inventory/edit/{product}', [ProductController::class, 'edit'])->name('product.editItem');
    Route::put('inventory/edit/{product}', [ProductController::class, 'update'])->name('product.updateItem');

    Route::delete('inventory/delete/{product}', [ProductController::class, 'destroy'])->name('product.destroyItem');
});
