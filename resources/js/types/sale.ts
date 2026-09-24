import {
    PaymentMethod,
    PaymentStatus,
    SaleItemStatus,
    SaleStatus,
} from "@/enums";
import { User } from "./auth";
import { Customer } from "./customer";

export type Sale = {
    id: number;
    sale_number?: string;
    sale_products?: SaleProduct[];
    user_id?: number;
    user: User;
    customer_id?: number;
    customer?: Customer;
    status: SaleStatus;
    payment_status: PaymentStatus;
    payment_method: PaymentMethod;
    subtotal_amount: number;
    tax_amount: number;
    discount_amount: number;
    total_amount: number;
    currency: string;
    paid_amount: number;
    change_amount: number;
    debt_amount: number;
    notes?: string;
    created_at: string;
};

export type SaleProduct = {
    id: number;
    sale_id: number;
    product_id?: number;
    product_name: string;
    product_sku: string;
    quantity: number;
    unit_price: number;
    flat_discount: number;
    total_price: number;
    item_status: SaleItemStatus;
    created_at: string;
};
