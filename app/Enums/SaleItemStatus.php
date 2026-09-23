<?php

namespace App\Enums;

enum SaleItemStatus: string
{
    case ACTIVE = 'active';
    case REFUNDED = 'refunded';
    case EXCHANGED = 'exchanged';

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::REFUNDED => 'Refunded',
            self::EXCHANGED => 'Exchanged',
        };
    }
}
