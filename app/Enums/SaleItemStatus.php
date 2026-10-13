<?php

namespace App\Enums;

enum SaleItemStatus: string
{
    case PAID = 'paid';
    case PARTIALLY_REFUNDED = 'partially_refunded';
    case REFUNDED = 'refunded';

    public function label(): string
    {
        return match ($this) {
            self::PAID => 'Paid',
            self::PARTIALLY_REFUNDED => 'Partially Refunded',
            self::REFUNDED => 'Refunded',
        };
    }
}
