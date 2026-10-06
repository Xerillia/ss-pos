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
    removeFromRefund: (item: RefundItem) => void;
    subTotalOf: (item: RefundItem) => number;
    totalRefund: () => number;
    resetRefund: () => void;
}

const RefundContext = createContext<RefundContextType | undefined>(undefined);

const isFound = (item: RefundItem, product_id: number, sale_id: number) =>
    item.product.id === product_id && item.sale_id === sale_id;

const effectivePrice = (item: RefundItem) =>
    item.override_unit_price || item.product.unit_price;

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

    const removeFromRefund = (item: RefundItem) => {
        setRefundCart((prevCart) =>
            prevCart.filter((i) => {
                if (i.sale_id) return i.sale_id !== item.sale_id;
                // TODO: what about refunds for pre-POS or unknowns?
            }),
        );
    };

    const subTotalOf = (item: RefundItem) => {
        return (
            (effectivePrice(item) - item.product.unit_discount) *
                item.quantity -
            item.product.flat_discount
        );
    };

    const totalRefund = () => {
        return refundCart.reduce((total, item) => {
            const subtotal = subTotalOf(item);

            return total + Math.min(subtotal, item.product.subtotal);
        }, 0);
    };

    const resetRefund = () => {
        setRefundCart([]);
    };

    return (
        <RefundContext.Provider
            value={{
                refundCart,
                addToRefund,
                removeFromRefund,
                subTotalOf,
                totalRefund,
                resetRefund,
            }}
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
