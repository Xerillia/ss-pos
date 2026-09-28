<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case PAID = 'paid';
    case PARTIAL = 'partial';
    case UNPAID = 'unpaid';
    case PARTIALLY_REFUNDED = 'partially_refunded';
    case PENDING = 'pending';
    case CANCELLED = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::PAID => 'Paid',
            self::PARTIAL => 'Partially Paid',
            self::UNPAID => 'Unpaid',
            self::PARTIALLY_REFUNDED => 'Partially Refunded',
            self::PENDING => 'Pending',
            self::CANCELLED => 'Cancelled',
        };
    }
}
