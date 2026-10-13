<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Refund extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'sale_product_id',
        'product_id',
        'quantity',
        'refund_date',
        'refund_reason',
    ];

    protected $casts = [
        'refund_date' => 'datetime',
    ];

    /**
     * Get the sale product associated with this refund.
     */
    public function saleProduct(): BelongsTo
    {
        return $this->belongsTo(SaleProduct::class, 'sale_product_id');
    }
}
