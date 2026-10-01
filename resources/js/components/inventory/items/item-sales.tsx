import { Product } from "@/types/product";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { SaleProduct } from "@/types/sale";

interface ItemSalesProps {
    sale_products: SaleProduct[];
}

export default function ItemSales({ sale_products }: ItemSalesProps) {
    return <DataTable columns={columns} data={sale_products} />;
}
