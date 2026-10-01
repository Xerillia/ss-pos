<?php

namespace App\Enums;

enum Unit: string
{
    case PIECE = 'pcs';
    case KILOGRAM = 'kg';
    case PAIL = 'pail';
    case BOX = 'box';

    public function label(): string
    {
        return match ($this) {
            self::PIECE => 'Pcs',
            self::KILOGRAM => 'KG',
            self::PAIL => 'Pail',
            self::BOX => 'Box',
        };
    }
}
