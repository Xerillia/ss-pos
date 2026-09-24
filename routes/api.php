<?php

use App\Http\Controllers\BackupController;
use App\Http\Controllers\POSCheckoutController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->name('api.')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('user');

    Route::name('backup.')->prefix('/backups')->group(function () {
        Route::get('/', [BackupController::class, 'index'])->name('index');
        Route::post('/', [BackupController::class, 'generate'])->name('generate');
        Route::get('/{name}', [BackupController::class, 'download'])->name('download')->where('name', '.*\.(zip|sql)$');
        Route::post('/restore', [BackupController::class, 'uploadAndApply'])->name('uploadAndApply');
        Route::post('/restore/{name}', [BackupController::class, 'apply'])->name('restore')->where('name', '.*\.(zip|sql)$');
        Route::delete('/delete/{name}', [BackupController::class, 'delete'])->name('delete')->where('name', '.*\.(zip|sql)$');
    });

    Route::post('/pos/checkout', [POSCheckoutController::class, 'store'])->name('checkout');
});
