<?php

namespace App\Exceptions;

use Exception;

class InsufficientStockException extends Exception
{
    protected int $productId;

    public function __construct(string $productName, int $productId)
    {
        parent::__construct("Insufficient stock for product: {$productName}");
        $this->productId = $productId;
    }

    public function getProductId(): int
    {
        return $this->productId;
    }
}
