import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { useRefundContext } from "./refund-context";

export default function RefundCard() {
    const { refundCart } = useRefundContext();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Refund Items</CardTitle>
                <CardDescription>
                    A list of items to be refunded
                </CardDescription>
            </CardHeader>
            <CardContent>
                {refundCart.map((item) => (
                    <p>
                        {item.product.name} {item.quantity}
                    </p>
                ))}
            </CardContent>
        </Card>
    );
}
