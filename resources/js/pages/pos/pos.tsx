import Cart from "@/components/pos/cart";
import { CartProvider } from "@/components/pos/cart-context";
import ItemList from "@/components/pos/item-list";
import { RefundProvider } from "@/components/pos/refunds/refund-context";
import { Customer } from "@/types/customer";
import { LaravelPaginationProps } from "@/types/laravel-pagination-props";
import { Product } from "@/types/product";
import { Sale } from "@/types/sale";

interface PointOfSaleProps {
    products: Product[];
    customers: Customer[];
    sales: LaravelPaginationProps<Sale>;
}

export default function PointOfSale({
    products,
    customers,
    sales,
}: PointOfSaleProps) {
    return (
        <CartProvider>
            <RefundProvider>
                <div className="m-4 grid grid-cols-[7fr_5fr] gap-4">
                    <ItemList products={products} />
                    <Cart customers={customers} sales={sales.data} />
                </div>
            </RefundProvider>
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
