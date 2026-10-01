import { Unit } from "@/enums";
import { SaleProduct } from "./sale";

export type Product = {
    id: number;
    sku: string;
    name: string;
    description: string;
    capital: number;
    price: number;
    quantity: number;
    unit: Unit;
    created_at: string;
    updated_at: string;
    sale_products: SaleProduct[];
};
