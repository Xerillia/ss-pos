<?php

namespace App\Models;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Enums\SaleStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sale_number',
        'user_id',
        'customer_id',
        'status',
        'payment_status',
        'payment_method',
        'subtotal_amount',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'currency',
        'refund_amount',
        'paid_amount',
        'change_amount',
        'debt_amount',
        'notes',
        'sale_date',
    ];

    protected $casts = [
        'subtotal_amount' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'refund_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'change_amount' => 'decimal:2',
        'debt_amount' => 'decimal:2',
        'payment_status' => PaymentStatus::class,
        'payment_method' => PaymentMethod::class,
        'status' => SaleStatus::class,
        'sale_date' => 'datetime',
    ];

    /**
     * Get the products associated with this sale.
     */
    public function saleProducts(): HasMany
    {
        return $this->hasMany(SaleProduct::class);
    }

    /**
     * Get the user (cashier) who made the sale.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the customer that is associated with the sale.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function scopeDateRange(Builder $query, string|\DateTimeInterface $startDate, string|\DateTimeInterface $endDate)
    {
        return $query->whereBetween('sale_date', [$startDate, $endDate]);
    }
}
