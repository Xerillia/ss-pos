import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import CartItemCard from "./cart-item-card";
import CartSummary from "./cart-summary";
import { useCartContext } from "./cart-context";
import { Customer } from "@/types/customer";
import CustomerCombobox from "./customer-combobox";
import ClearCartButton from "./clear-cart-button";

interface CartProps {
    customers: Customer[];
}

export default function Cart({ customers }: CartProps) {
    const { cart } = useCartContext();

    const [expandId, setExpandId] = useState<number | null>();

    const handleToggleExpand = (id: number) => {
        setExpandId((prev) => (prev === id ? null : id));
    };

    return (
        <Card className="max-h-dvh h-dvh overflow-y-auto">
            <CardHeader className="border-b">
                <CardTitle className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <ShoppingCart
                            data-icon="inline-start"
                            className="w-4 h-4"
                        />
                        Cart
                    </div>
                    <CustomerCombobox customers={customers} />
                    <ClearCartButton />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div className="space-y-2">
                    {cart.map((item) => {
                        const product = item.product;

                        return (
                            <CartItemCard
                                key={product.id}
                                item={item}
                                isExpanded={expandId === item.product.id}
                                onToggleExpand={() =>
                                    handleToggleExpand(item.product.id)
                                }
                            />
                        );
                    })}
                </div>
            </CardContent>

            <CartSummary />
        </Card>
    );
}
