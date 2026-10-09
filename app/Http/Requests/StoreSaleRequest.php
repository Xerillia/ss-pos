<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sale_number' => ['nullable', 'string', 'max:50', 'unique:sales,sale_number'],
            'customer_id' => ['nullable', 'exists:customers,id'],
            'payment_method' => ['required', 'string'],
            'paid_amount' => ['required', 'numeric', 'min:0'],
            'tax_amount' => ['nullable', 'numeric', 'min:0'],
            'discount_amount' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'size:3'],
            'notes' => ['nullable', 'string'],
            'sale_date' => ['required', 'date'],

            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'distinct', 'exists:products,id'],
            'items.*.quantity' => ['required', 'numeric', 'gt:0'],
            'items.*.unit_discount' => ['nullable', 'numeric', 'min:0'],
            'items.*.flat_discount' => ['nullable', 'numeric', 'min:0'],

            'refunds' => ['nullable', 'array'],
            'refunds.*.product_id' => ['required', 'exists:products,id'],
            'refunds.*.sale_product_id' => ['nullable', 'exists:sale_products,id'],
            'refunds.*.sale_id' => ['nullable', 'exists:sales,id'],
            'refunds.*.quantity' => ['required', 'numeric', 'gt:0'],
            'refunds.*.override_unit_price' => ['nullable', 'numeric'],
            'refunds.*.return_reason' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'sale_number.unique' => 'This sale number has already been used.',
            'items.*.product_id.distinct' => 'Duplicate product detected in checkout items. Merge quantities instead.',
        ];
    }
}
