<?php

namespace App\Models;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Expenditure extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'expense_number',
        'expense_category_id',
        'user_id',
        'title',
        'amount',
        'payment_method',
        'expense_date',
        'status',
        'reference_number',
        'attachment_path',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'expense_date' => 'datetime',
        'payment_method' => PaymentMethod::class,
        'status' => PaymentStatus::class,
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($expenditure) {
            if (empty($expenditure->expense_number)) {
                $datePrefix = now()->format('Ymd');

                $latest = self::where('expense_number', 'LIKE', "EXP-{$datePrefix}-%")
                    ->latest('id')
                    ->first();

                if ($latest) {
                    $sequence = (int) substr($latest->expense_number, -4) + 1;
                } else {
                    $sequence = 1;
                }

                $expenditure->expense_number = sprintf('EXP-%s-%04d', $datePrefix, $sequence);
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category_id')
            ->withTrashed()
            ->withDefault([
                'name' => 'Uncategorized',
            ]);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeDateRange(Builder $query, string|\DateTimeInterface $startDate, string|\DateTimeInterface $endDate)
    {
        return $query->whereBetween('expense_date', [$startDate, $endDate]);
    }
}
