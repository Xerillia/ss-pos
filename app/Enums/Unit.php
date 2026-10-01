<?php

namespace App\Enums;

enum Unit: string
{
    case BOX = 'box';
    case KILOGRAM = 'kg';
    case METER = 'mtr';
    case PAIL = 'pail';
    case PIECE = 'pcs';
    case ROLL = 'roll';

    public function label(): string
    {
        return match ($this) {
            self::BOX => 'Box',
            self::KILOGRAM => 'Kilogram',
            self::METER => 'Meter',
            self::PAIL => 'Pail',
            self::PIECE => 'Pieces',
            self::ROLL => 'Roll',
        };
    }
}
