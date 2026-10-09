<?php

namespace App\Enums;

enum SaleItemStatus: string
{
    case PAID = 'paid';
    case REFUNDED = 'refunded';

    public function label(): string
    {
        return match ($this) {
            self::PAID => 'Paid',
            self::REFUNDED => 'Refunded',
        };
    }
}
