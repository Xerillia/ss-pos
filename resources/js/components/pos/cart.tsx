import { ShoppingCart, Trash } from "lucide-react";
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
}

export default function Cart({ cart, removeFromCart }: CartProps) {
    return (
        <Card>
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
            <CardContent className="space-y-2">
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
                            </CardContent>
                        </Card>
                    );
                })}
            </CardContent>
        </Card>
    );
}
