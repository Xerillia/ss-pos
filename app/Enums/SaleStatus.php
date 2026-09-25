<?php

namespace App\Enums;

enum SaleStatus: string
{
    case COMPLETED = 'completed';
    case PENDING = 'pending';
    case REFUNDED = 'refunded';

    public function label(): string
    {
        return match ($this) {
            self::COMPLETED => 'Completed',
            self::PENDING => 'Pending',
            self::REFUNDED => 'Refunded',
        };
    }
}
