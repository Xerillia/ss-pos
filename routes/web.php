<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('converter', 'converter')->name('converter');
    Route::inertia('backup', 'backup')->name('backup');
});

require __DIR__.'/settings.php';
require __DIR__.'/inventory.php';
require __DIR__.'/sale.php';
require __DIR__.'/customer.php';
