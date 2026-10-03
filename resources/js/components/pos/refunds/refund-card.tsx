import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { useRefundContext } from "./refund-context";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { rupiah } from "@/lib/rupiah";

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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sale ID</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead>Unit Disc</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Flat Disc</TableHead>
                            <TableHead>Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {refundCart.map((cart) => {
                            const product = cart.product;
                            return (
                                <TableRow
                                    key={`${product.id}-${cart.sale_id ?? "none"}`}
                                >
                                    <TableCell>{cart.sale_id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        {product.unit_price > 1 &&
                                            rupiah(product.unit_price)}
                                    </TableCell>
                                    <TableCell>
                                        {rupiah(product.unit_discount)}
                                    </TableCell>
                                    <TableCell>{cart.quantity}</TableCell>
                                    <TableCell>
                                        {rupiah(product.flat_discount)}
                                    </TableCell>
                                    <TableCell>
                                        {rupiah(product.subtotal)}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
