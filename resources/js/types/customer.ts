export type Customer = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    postal_code: string | null;
    credit_limit: number;
    total_spent: number;
    is_active: boolean;
    notes: string | null;
    created_at: string;
    total_debt: number | null;
    total_order: number | null;
};
