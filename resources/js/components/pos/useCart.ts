import { processCheckout } from "@/api/axios";
import { PaymentMethod } from "@/enums";
import { useLocalStorageState } from "@/hooks/use-local-storage";
import { localToUtcIso, utcToLocalIso } from "@/lib/archive";
import { formatNumber } from "@/lib/number";
import { Customer } from "@/types/customer";
import { Product } from "@/types/product";
import { useState } from "react";
import { RefundItem } from "./refunds/refund-context";

export interface CartItem {
    product: Product;
    quantity: number;
    unit_discount: number;
    flat_discount: number;
}

const CART_STORAGE_KEY = "shopping_cart";

export function useCart() {
    const [cart, setCart] = useLocalStorageState<CartItem[]>(
        CART_STORAGE_KEY,
        [],
    );
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
        PaymentMethod.CASH,
    );
    const [payAmount, setPayAmount] = useState<number>();
    const [discountAmount, setDiscountAmount] = useState<number>();
    const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
    const [saleNumber, setSaleNumber] = useState<string>();
    const [saleDate, setSaleDate] = useState<string>(utcToLocalIso());

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
                    if (item.quantity + 1 >= item.product.quantity)
                        return {
                            ...item,
                            quantity: formatNumber(item.product.quantity),
                        };

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

    const setItemCount = (productId: string | number, quantity: number) => {
        setCart((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.product.id === productId) {
                        return {
                            ...item,
                            quantity: Math.min(quantity, item.product.quantity),
                        };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0),
        );
    };

    const subTotalWithoutDiscount = (productId: string | number) => {
        const item = cart.find((i) => i.product.id === productId);

        if (!item) return 0;

        return item.product.price * item.quantity;
    };

    const subTotal = (productId: string | number) => {
        const item = cart.find((i) => i.product.id === productId);

        if (!item) return 0;

        const discountedUnitPrice = Math.max(
            0,
            item.product.price - (item.unit_discount || 0),
        );

        const totalBeforeFlatDiscount = discountedUnitPrice * item.quantity;

        const finalSubtotal = Math.max(
            0,
            totalBeforeFlatDiscount - (item.flat_discount || 0),
        );

        return finalSubtotal;
    };

    const cartTotalWithoutDiscount = () => {
        return cart.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    };

    const cartTotal = () => {
        const totalBeforeDiscount = cart.reduce((total, item) => {
            const discountedUnitPrice = Math.max(
                0,
                item.product.price - (item.unit_discount || 0),
            );
            const itemTotal = Math.max(
                0,
                discountedUnitPrice * item.quantity - (item.flat_discount || 0),
            );
            return total + itemTotal;
        }, 0);

        const finalTotal = Math.max(
            0,
            totalBeforeDiscount - (discountAmount || 0),
        );
        return finalTotal;
    };

    const setUnitDiscount = (productId: string | number, discount: number) => {
        const safeDiscount = Math.max(0, discount);

        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.product.id === productId) {
                    const cappedDiscount = Math.min(
                        safeDiscount,
                        item.product.price,
                    );

                    return { ...item, unit_discount: cappedDiscount };
                }
                return item;
            }),
        );
    };

    const setFlatDiscount = (productId: string | number, discount: number) => {
        const safeDiscount = Math.max(0, discount);

        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.product.id === productId) {
                    return { ...item, flat_discount: safeDiscount };
                }
                return item;
            }),
        );
    };

    const clearCart = () => {
        setCart([]);
        setPayAmount(undefined);
        setDiscountAmount(undefined);
        setSelectedCustomer(undefined);
        setPaymentMethod(PaymentMethod.CASH);
        setSaleNumber(undefined);
        setSaleDate(utcToLocalIso());
        try {
            localStorage.removeItem(CART_STORAGE_KEY);
        } catch (error) {
            console.error("Failed to clear cart from localStorage:", error);
        }
    };

    const finishTransaction = async (refundCart?: RefundItem[]) => {
        if (cart.length === 0) {
            throw new Error("Cannot checkout with an empty cart.");
        }

        const payload = {
            customer_id: selectedCustomer?.id ?? null,
            payment_method: paymentMethod,
            paid_amount: payAmount ?? 0,
            discount_amount: discountAmount ?? 0,
            tax_amount: 0,
            currency: "IDR",
            sale_number: saleNumber ?? null,
            notes: null,
            sale_date: localToUtcIso(saleDate),
            items: cart.map((item) => ({
                product_id: item.product.id,
                quantity: item.quantity,
                unit_discount: item.unit_discount || 0,
                flat_discount: item.flat_discount || 0,
            })),
            refunds:
                refundCart?.map((item) => ({
                    product_id: item.product.id,
                    quantity: item.quantity,
                    override_unit_price: item.override_unit_price || null,
                    return_reason: item.return_reason || null,
                })) || [],
        };

        try {
            const response = await processCheckout(payload);

            if (response.success) {
                clearCart();
            }

            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
        setItemCount,
        subTotal,
        subTotalWithoutDiscount,
        cartTotal,
        cartTotalWithoutDiscount,
        setUnitDiscount,
        setFlatDiscount,
        paymentMethod,
        setPaymentMethod,
        payAmount,
        setPayAmount,
        discountAmount,
        setDiscountAmount,
        selectedCustomer,
        setSelectedCustomer,
        clearCart,
        finishTransaction,
        saleNumber,
        setSaleNumber,
        saleDate,
        setSaleDate,
    };
}
