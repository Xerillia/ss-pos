<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'credit_limit' => 'decimal:2',
        'total_spent' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * All sales associated with this customer
     */
    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }

    /**
     * All debts this customer has
     */
    public function debts(): HasMany
    {
        return $this->hasMany(Sale::class)
            ->whereIn('payment_status', [
                PaymentStatus::UNPAID,
                PaymentStatus::PARTIAL,
            ]);
    }

    /**
     * Calculate ALL unpaid debts
     */
    public function totalDebt(): Attribute
    {
        return Attribute::make(
            get: function ($value, array $attributes) {
                // withSum()
                if (array_key_exists('total_debt', $attributes)) {
                    return (float) ($attributes['total_debt'] ?? 0.00);
                }

                // single model instance
                return (float) $this->sales()
                    ->whereIn('payment_status', [
                        PaymentStatus::UNPAID,
                        PaymentStatus::PARTIAL,
                    ])
                    ->sum('debt_amount');
            }
        );
    }

    /**
     * Calculate total orders
     */
    public function totalOrder(): Attribute
    {
        return Attribute::make(
            get: function ($value, array $attributes) {
                // If loaded via withCount('sales') or withCount('sales as total_order')
                if (array_key_exists('sales_count', $attributes)) {
                    return (int) $attributes['sales_count'];
                }

                if (array_key_exists('total_order', $attributes)) {
                    return (int) $attributes['total_order'];
                }

                // Fallback for a single Customer model instance
                return (int) $this->sales()->count();
            }
        );
    }

    public function scopeActive(Builder $query)
    {
        return $query->where('is_active', true);
    }

    public function scopeSearch(Builder $query, string $term)
    {
        return $query->where(function ($q) use ($term) {
            $q->where('name', 'like', "%{$term}%")
                ->orWhere('phone', 'like', "%{$term}%")
                ->orWhere('email', 'like', "%{$term}%");
        });
    }
}
