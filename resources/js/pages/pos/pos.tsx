import ItemList from "@/components/pos/item-list";
import { Product } from "@/types/product";

interface PointOfSaleProps {
    products: Product[];
}

export default function PointOfSale({ products }: PointOfSaleProps) {
    return (
        <div className="m-4">
            <ItemList products={products} />
        </div>
    );
}

PointOfSale.layout = {
    breadcrumbs: [
        {
            title: "Point of Sale",
        },
    ],
};
