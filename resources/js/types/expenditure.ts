import { PaymentMethod, PaymentStatus } from "@/enums";
import { User } from "./auth";

export type ExpenseCategory = {
    id: number;
    name: string;
};

export type Expenditure = {
    id: number;
    expense_number: string;
    title: string;
    amount: string | number;
    expense_date: string;
    payment_method: PaymentMethod;
    status: PaymentStatus;
    reference_number?: string;
    category?: ExpenseCategory;
    user?: User;
};
