<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BackupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $disk = Storage::disk('local');
        $files = $disk->files(config('app.name'));

        $backups = collect($files)->map(function ($file) use ($disk) {
            return [
                'name' => basename($file),
                'size' => round($disk->size($file) / 1024, 2).' KB',
                'date' => $disk->lastModified($file),
            ];
        })->sortBy('date')->values();

        return response()->json($backups);
    }

    /**
     * Generate a new backup
     */
    public function generate()
    {
        try {
            Artisan::call('backup:run', ['--only-db' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Database backup completed successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Backup failed: '.$e->getMessage());

            return response()->json(['
                success' => false,
                'message' => 'Backup failed. Check server logs.',
            ], 500);
        }
    }
}
