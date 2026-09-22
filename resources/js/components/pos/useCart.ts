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
    const [cart, setCart] = useState<CartItem[]>([]);

    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
        } finally {
            setIsHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (!isHydrated) return; // wait until hydration is complete

        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error("Failed to save cart to localStorage:", error);
        }
    }, [cart, isHydrated]);

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
                    product_id: product.id,
                    quantity: 1,
                    unit_discount: 0,
                    flat_discount: 0,
                },
            ];
        });
    };

    const removeFromCart = (productId: string | number) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.product.id !== productId),
        );
    };

    const incrementItem = (productId: string | number) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.product.id === productId) {
                    // max item from stock
                    if (item.quantity >= item.product.quantity) return item;

                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            }),
        );
    };

    const decrementItem = (productId: string | number) => {
        setCart((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.product.id === productId) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                })
                // remove items that reaches 0 or less qty
                .filter((item) => item.quantity > 0),
        );
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
    };
}
