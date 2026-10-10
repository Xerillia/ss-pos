<?php

namespace App\Exceptions;

use Exception;

class ProhibitRefundException extends Exception
{
    public function __construct(float $totalAmount, float $refundAmount)
    {
        parent::__construct("Refunding prohibited due to refund amount {$refundAmount} being bigger than total amount {$totalAmount}.");
    }
}
