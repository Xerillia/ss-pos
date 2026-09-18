<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BackupController extends Controller
{
    protected const DISK = 'local';

    /**
     * Extract the name from a filename
     *
     * @param  string  $fileName  In the format YYYY-MM-DD-HH-mm-ss-name.zip
     */
    protected function extractName(string $fileName): string
    {
        if (preg_match('/^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}(?:-(.+?))?(?:\.zip)?$/', $fileName, $matches)) {
            if (isset($matches[1])) {
                return str_replace('-', ' ', $matches[1]);
            }
        }

        return '';
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $disk = Storage::disk(self::DISK);
        $files = $disk->files(config('app.name'));

        $backups = collect($files)->map(function ($file) use ($disk) {
            $filename = basename($file);

            return [
                'filename' => $filename,
                'name' => self::extractName($filename),
                'size' => round($disk->size($file) / 1024, 2).' KB',
                'date' => $disk->lastModified($file) * 1000, // to millisecond
            ];
        })->sortByDesc('date')->values();

        return response()->json($backups);
    }

    /**
     * Generate a new backup
     */
    public function generate(Request $request)
    {
        $request->validate([
            'backup_name' => ['nullable', 'string', 'max:255'],
        ]);

        $arguments = [
            '--only-db' => true,
            '--no-interaction' => true,
        ];

        if ($request->filled('backup_name')) {
            $safeName = Str::slug($request->input('backup_name'));
            $fileName = now()->format('Y-m-d-H-i-s').'-'.$safeName.'.zip';
            $arguments['--filename'] = $fileName;
        }

        try {
            Artisan::call('backup:run', $arguments);

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

        try {
            Artisan::call('backup:restore', [
                '--backup' => $filePath,
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

    public function apply(string $name)
    {
        $filePath = config('app.name').'/'.$name;

        try {
            Artisan::call('backup:restore', [
                '--backup' => $filePath,
                '--no-interaction' => true,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Database uploaded and applied successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Backup failed: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Backup failed. Check server logs.',
            ], 500);
        }
    }
}
