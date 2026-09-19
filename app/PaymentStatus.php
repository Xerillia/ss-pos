<?php

namespace App;

enum PaymentStatus: string
{
    case PAID = 'paid';
    case PARTIAL = 'partial';
    case UNPAID = 'unpaid';
    case PARTIALLY_REFUNDED = 'partially_refunded';

    public function label(): string
    {
        return match ($this) {
            self::PAID => 'Paid',
            self::PARTIAL => 'Partially Paid',
            self::UNPAID => 'Unpaid',
            self::PARTIALLY_REFUNDED => 'Partially Refunded',
        };
    }
}
