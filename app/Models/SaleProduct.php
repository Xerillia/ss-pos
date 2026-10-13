<?php

namespace App\Models;

use App\Enums\SaleItemStatus;
use App\Enums\Unit;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SaleProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'sale_id',
        'product_id',
        'product_name',
        'product_sku',
        'product_unit',
        'quantity',
        'unit_price',
        'unit_discount',
        'flat_discount',
        'total_price',
        'item_status',
    ];

    protected $casts = [
        'product_unit' => Unit::class,
        'item_status' => SaleItemStatus::class,
        'quantity' => 'decimal:2',
        'unit_price' => 'decimal:2',
        'unit_discount' => 'decimal:2',
        'flat_discount' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];

    /**
     * Get the parent sale record.
     */
    public function sale(): BelongsTo
    {
        return $this->belongsTo(Sale::class);
    }

    /**
     * Get the original product entity.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeNotRefunded(Builder $query): void
    {
        $query->where('item_status', '!=', SaleItemStatus::REFUNDED);
    }
}
