import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export interface CartItem {
    product: Product;
    quantity: number;
    unit_discount: number;
    flat_discount: number;
}

const CART_STORAGE_KEY = "shopping_cart";

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return []; // SSR safeguard

        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error("Failed to save cart to localStorage:", error);
        }
    }, [cart]);

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
