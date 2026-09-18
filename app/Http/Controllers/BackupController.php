<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;

class BackupController extends Controller
{
    protected const DISK = 'local';

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $disk = Storage::disk(self::DISK);
        $files = $disk->files(config('app.name'));

        $backups = collect($files)->map(function ($file) use ($disk) {
            return [
                'name' => basename($file),
                'size' => round($disk->size($file) / 1024, 2).' KB',
                'date' => $disk->lastModified($file),
            ];
        })->sortByDesc('date')->values();

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

            return response()->json([
                'success' => false,
                'message' => 'Backup failed. Check server logs.',
            ], 500);
        }
    }

    public function download(string $name)
    {
        return Storage::disk(self::DISK)->download(config('app.name').'/'.$name);
    }

    public function uploadAndApply(Request $request)
    {
        // validation
        $request->validate([
            'backup_file' => ['required', 'file', 'mimes:zip,sql', 'max:50000'],
        ]);

        // temp storage
        $file = $request->file('backup_file');
        $fileName = time().'_'.$file->getClientOriginalName();
        $filePath = $file->storeAs('temp-backups', $fileName, 'local');

        $absolutePath = storage_path('app/'.$filePath);

        try {
            Artisan::call('backup:restore', [
                '--backup' => $absolutePath,
                '--no-interaction' => true,
            ]);

            // delete on success
            Storage::disk('local')->delete($filePath);

            return response()->json([
                'success' => true,
                'message' => 'Database uploaded and applied successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Restore failed: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Restore failed. Check server logs.',
            ], 500);
        }
    }
}
