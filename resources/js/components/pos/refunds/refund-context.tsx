import { useLocalStorageState } from "@/hooks/use-local-storage";
import { Product } from "@/types/product";
import { SaleProduct } from "@/types/sale";
import { createContext, useContext } from "react";

export type RefundItem = {
    product: {
        id: number;
        name: string;
    };
    quantity: number;
    order_id?: number | null;
    override_unit_price?: number | null;
    return_reason?: string | null;
};

interface RefundContextType {
    refundCart: RefundItem[];
    addToRefund: (sale_product: SaleProduct) => void;
}

const RefundContext = createContext<RefundContextType | undefined>(undefined);

const isFound = (item: RefundItem, id: number) => item.product.id === id;

export function RefundProvider({ children }: { children: React.ReactNode }) {
    const [refundCart, setRefundCart] = useLocalStorageState<RefundItem[]>(
        "refund_cart",
        [],
    );

    const addToRefund = (sale_product: SaleProduct) => {
        setRefundCart((prevCart) => {
            const existing = prevCart.find((item) =>
                isFound(item, sale_product.product_id),
            );

            if (existing) {
                // refund based on past orders
                if (
                    sale_product &&
                    existing.quantity >= sale_product?.quantity
                ) {
                    return prevCart;
                }

                // increment refunded item
                return prevCart.map((item) =>
                    isFound(item, sale_product.product_id)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }

            // add new refunded item
            return [
                ...prevCart,
                {
                    product: {
                        id: sale_product.product_id,
                        name: sale_product.product_name,
                    },
                    quantity: 1,
                },
            ];
        });
    };

    return (
        <RefundContext.Provider value={{ refundCart, addToRefund }}>
            {children}
        </RefundContext.Provider>
    );
}

export function useRefundContext() {
    const context = useContext(RefundContext);
    if (!context) {
        throw new Error(
            "useRefundContext must be used within a RefundProvider",
        );
    }
    return context;
}
