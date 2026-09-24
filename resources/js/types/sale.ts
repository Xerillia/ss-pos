import { PaymentMethod, PaymentStatus, SaleStatus } from "@/enums";
import { User } from "./auth";
import { Customer } from "./customer";

export type Sale = {
    id: number;
    sale_number?: string;
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
