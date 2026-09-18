<?php

use App\Http\Controllers\BackupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->name('api.')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('user');

    Route::name('backup.')->group(function () {
        Route::get('/backups', [BackupController::class, 'index'])->name('index');
        Route::post('/backups', [BackupController::class, 'generate'])->name('generate');
        Route::get('/backups/{name}', [BackupController::class, 'download'])->name('download');
        Route::post('/backups/restore', [BackupController::class, 'uploadAndApply'])->name('uploadAndApply');
    });
});
