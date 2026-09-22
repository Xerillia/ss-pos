import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { CartItem, useCart } from "./useCart";
import { Product } from "@/types/product";
import { PaymentMethod } from "@/enums";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string | number) => void;
    incrementItem: (productId: string | number) => void;
    decrementItem: (productId: string | number) => void;
    subTotal: (productId: string | number) => number;
    cartTotal: () => number;
    setUnitDiscount: (productId: string | number, discount: number) => void;
    setFlatDiscount: (productId: string | number, discount: number) => void;
    paymentMethod: string;
    setPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>;
    payAmount: number | undefined;
    setPayAmount: Dispatch<SetStateAction<number | undefined>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const {
        cart,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
        subTotal,
        cartTotal,
        setUnitDiscount,
        setFlatDiscount,
        paymentMethod,
        setPaymentMethod,
        payAmount,
        setPayAmount,
    } = useCart();

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                incrementItem,
                decrementItem,
                subTotal,
                cartTotal,
                setUnitDiscount,
                setFlatDiscount,
                paymentMethod,
                setPaymentMethod,
                payAmount,
                setPayAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
