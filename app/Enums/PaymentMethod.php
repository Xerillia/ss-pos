<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case CASH = 'cash';
    case TRANSFER_BCA = 'transfer_bca';
    case TRANSFER_BRI = 'transfer_bri';
    case TRANSFER_MANDIRI = 'transfer_mandiri';

    public function label(): string
    {
        return match ($this) {
            self::CASH => 'Cash',
            self::TRANSFER_BCA => 'BCA',
            self::TRANSFER_BRI => 'BRI',
            self::TRANSFER_MANDIRI => 'Mandiri',
        };
    }
}
