import Cart from "@/components/pos/cart";
import ItemList from "@/components/pos/item-list";
import { useCart } from "@/components/pos/useCart";
import { Product } from "@/types/product";

interface PointOfSaleProps {
    products: Product[];
}

export default function PointOfSale({ products }: PointOfSaleProps) {
    const { cart, addToCart, removeFromCart, incrementItem, decrementItem } =
        useCart();

    return (
        <div className="m-4 grid grid-cols-[7fr_5fr] gap-4">
            <ItemList products={products} addToCart={addToCart} />
            <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                incrementItem={incrementItem}
                decrementItem={decrementItem}
            />
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
