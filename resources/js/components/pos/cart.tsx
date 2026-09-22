import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { CartItem } from "./useCart";
import { rupiah } from "@/lib/rupiah";
import { Button } from "../ui/button";

interface CartProps {
    cart: CartItem[];
    removeFromCart: (productId: string | number) => void;
    incrementItem: (productId: string | number) => void;
    decrementItem: (productId: string | number) => void;
    subTotal: (productId: string | number) => number;
    cartTotal: () => number;
}

export default function Cart({
    cart,
    removeFromCart,
    incrementItem,
    decrementItem,
    subTotal,
    cartTotal,
}: CartProps) {
    return (
        <Card className="max-h-dvh overflow-y-auto">
            <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                    <ShoppingCart
                        data-icon="inline-start"
                        className="w-4 h-4"
                    />
                    Cart
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div className="space-y-2">
                    {cart.map((item) => {
                        const product = item.product;
                        return (
                            <Card key={product.id}>
                                <CardContent>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-bold">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {rupiah(product.price)}
                                            </p>
                                        </div>
                                        <Button
                                            className="w-6 h-6 hover:text-red-500"
                                            variant="ghost"
                                            onClick={() =>
                                                removeFromCart(product.id)
                                            }
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-1 items-center">
                                                <Button
                                                    className="w-6.5 h-6.5"
                                                    onClick={() =>
                                                        decrementItem(
                                                            product.id,
                                                        )
                                                    }
                                                >
                                                    <Minus className="p-0.5" />
                                                </Button>
                                                <div className="w-12">
                                                    <p className="font-bold text-sm text-center">
                                                        {item.quantity}
                                                    </p>
                                                </div>
                                                <Button
                                                    className="w-6.5 h-6.5"
                                                    onClick={() =>
                                                        incrementItem(
                                                            product.id,
                                                        )
                                                    }
                                                >
                                                    <Plus className="p-0.5" />
                                                </Button>
                                            </div>
                                            <p className="font-bold font-mono">
                                                {rupiah(subTotal(product.id))}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </CardContent>
            <CardContent className="mt-2 border-t py-4 sticky -bottom-6 bg-background -mb-6">
                <div className="font-bold flex justify-between">
                    <p>Total Amount</p>
                    <p className="font-mono">{rupiah(cartTotal())}</p>
                </div>
            </CardContent>
        </Card>
    );
}
