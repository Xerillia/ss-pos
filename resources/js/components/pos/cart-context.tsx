import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { CartItem, useCart } from "./useCart";
import { Product } from "@/types/product";
import { PaymentMethod } from "@/enums";
import { Customer } from "@/types/customer";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string | number) => void;
    incrementItem: (productId: string | number) => void;
    decrementItem: (productId: string | number) => void;
    subTotal: (productId: string | number) => number;
    subTotalWithoutDiscount: (productId: string | number) => number;
    cartTotal: () => number;
    cartTotalWithoutDiscount: () => number;
    setUnitDiscount: (productId: string | number, discount: number) => void;
    setFlatDiscount: (productId: string | number, discount: number) => void;
    paymentMethod: string;
    setPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>;
    payAmount: number | undefined;
    setPayAmount: Dispatch<SetStateAction<number | undefined>>;
    discountAmount: number | undefined;
    setDiscountAmount: Dispatch<SetStateAction<number | undefined>>;
    selectedCustomer: Customer | undefined;
    setSelectedCustomer: Dispatch<SetStateAction<Customer | undefined>>;
    clearCart: () => void;
    finishTransaction: () => any;
    saleNumber: string | undefined;
    setSaleNumber: Dispatch<SetStateAction<string | undefined>>;
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
