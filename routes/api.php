<?php

use App\Http\Controllers\BackupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/backups', [BackupController::class, 'index']);
    Route::post('/backups', [BackupController::class, 'generate']);
});
