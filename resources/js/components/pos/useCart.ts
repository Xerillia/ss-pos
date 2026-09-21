import { Product } from "@/types/product";
import { useState } from "react";

export interface CartItem {
    product: Product;
    quantity: number;
    unit_discount: number;
    flat_discount: number;
}

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        if (product.quantity <= 0) return;

        setCart((prevCart) => {
            const existing = prevCart?.find(
                (item) => item.product.id === product.id,
            );

            if (existing) {
                // limited by stock
                if (existing.quantity >= product.quantity) return prevCart;

                return prevCart.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }

            return [
                ...prevCart,
                {
                    product: product,
                    quantity: 1,
                    unit_discount: 0,
                    flat_discount: 0,
                },
            ];
        });
    };

    return {
        cart,
        addToCart,
    };
}
