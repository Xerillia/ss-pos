import { useLocalStorageState } from "@/hooks/use-local-storage";
import { SaleProduct } from "@/types/sale";
import { createContext, useContext } from "react";

export type RefundItem = {
    product: {
        id: number;
        name: string;
        unit_price: number;
        unit_discount: number;
        flat_discount: number;
        subtotal: number;
    };
    quantity: number;
    sale_id?: number | null;
    override_unit_price?: number | null;
    return_reason?: string | null;
};

interface RefundContextType {
    refundCart: RefundItem[];
    addToRefund: (sale_product: SaleProduct) => void;
    resetRefund: () => void;
}

const RefundContext = createContext<RefundContextType | undefined>(undefined);

const isFound = (item: RefundItem, product_id: number, sale_id: number) =>
    item.product.id === product_id && item.sale_id === sale_id;

export function RefundProvider({ children }: { children: React.ReactNode }) {
    const [refundCart, setRefundCart] = useLocalStorageState<RefundItem[]>(
        "refund_cart",
        [],
    );

    const addToRefund = (sale_product: SaleProduct) => {
        setRefundCart((prevCart) => {
            const existing = prevCart.find((item) =>
                isFound(item, sale_product.product_id, sale_product.sale_id),
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
                    isFound(item, sale_product.product_id, sale_product.sale_id)
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
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
                        unit_price: sale_product.unit_price,
                        unit_discount: sale_product.unit_discount,
                        flat_discount: sale_product.flat_discount,
                        subtotal: sale_product.total_price,
                    },
                    quantity: 1,
                    sale_id: sale_product.sale_id,
                },
            ];
        });
    };

    const resetRefund = () => {
        setRefundCart([]);
    };

    return (
        <RefundContext.Provider
            value={{ refundCart, addToRefund, resetRefund }}
        >
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
