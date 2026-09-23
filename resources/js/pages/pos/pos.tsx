import Cart from "@/components/pos/cart";
import { CartProvider } from "@/components/pos/cart-context";
import ItemList from "@/components/pos/item-list";
import { Customer } from "@/types/customer";
import { Product } from "@/types/product";

interface PointOfSaleProps {
    products: Product[];
    customers: Customer[];
}

export default function PointOfSale({ products, customers }: PointOfSaleProps) {
    return (
        <CartProvider>
            <div className="m-4 grid grid-cols-[7fr_5fr] gap-4">
                <ItemList products={products} />
                <Cart customers={customers} />
            </div>
        </CartProvider>
    );
}

PointOfSale.layout = {
    breadcrumbs: [
        {
            title: "Point of Sale",
        },
    ],
};
