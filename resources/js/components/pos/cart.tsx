import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CartItem } from "./useCart";

import { useState } from "react";

import CardItemCard from "./card-item-card";
import CartSummary from "./cart-summary";

interface CartProps {
    cart: CartItem[];
    removeFromCart: (productId: string | number) => void;
    incrementItem: (productId: string | number) => void;
    decrementItem: (productId: string | number) => void;
    subTotal: (productId: string | number) => number;
    cartTotal: () => number;
    setUnitDiscount: (productId: string | number, discount: number) => void;
    setFlatDiscount: (productId: string | number, discount: number) => void;
}

export default function Cart({
    cart,
    removeFromCart,
    incrementItem,
    decrementItem,
    subTotal,
    cartTotal,
    setUnitDiscount,
    setFlatDiscount,
}: CartProps) {
    const [expandId, setExpandId] = useState<number | null>();

    const handleToggleExpand = (id: number) => {
        setExpandId((prev) => (prev === id ? null : id));
    };

    return (
        <Card className="max-h-dvh overflow-y-auto">
            <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                    <ShoppingCart
                        data-icon="inline-start"
                        className="w-4 h-4"
                    />
                    Cart
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div className="space-y-2">
                    {cart.map((item) => {
                        const product = item.product;

                        return (
                            <CardItemCard
                                key={product.id}
                                item={item}
                                isExpanded={expandId === item.product.id}
                                onToggleExpand={() =>
                                    handleToggleExpand(item.product.id)
                                }
                                removeFromCart={removeFromCart}
                                incrementItem={incrementItem}
                                decrementItem={decrementItem}
                                subTotal={subTotal}
                                setUnitDiscount={setUnitDiscount}
                                setFlatDiscount={setFlatDiscount}
                            />
                        );
                    })}
                </div>
            </CardContent>

            <CartSummary total={cartTotal()} />
        </Card>
    );
}
