<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
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
}
