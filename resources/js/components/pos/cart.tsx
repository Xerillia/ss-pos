import { ShoppingCart } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { CartItem } from "./useCart";

interface CartProps {
    cart: CartItem[];
}

export default function Cart({ cart }: CartProps) {
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
            <CardContent>
                {cart.map((item) => (
                    <p key={item.product.id}>
                        {item.product.name}, qty: {item.quantity}
                    </p>
                ))}
            </CardContent>
        </Card>
    );
}
