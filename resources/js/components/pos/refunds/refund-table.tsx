import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { rupiah } from "@/lib/rupiah";
import { useRefundContext } from "./refund-context";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function RefundTable() {
    const { subTotalOf, refundCart, removeFromRefund } = useRefundContext();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead />
                    <TableHead>Sale ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Refund</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {refundCart.map((item) => {
                    const product = item.product;
                    return (
                        <TableRow
                            key={`${product.id}-${item.sale_id ?? "none"}`}
                        >
                            <TableCell>
                                <Button
                                    size="xs"
                                    className="w-6.5 h-6.5"
                                    variant="destructive"
                                    onClick={() => removeFromRefund(item)}
                                >
                                    <Trash />
                                </Button>
                            </TableCell>
                            <TableCell>{item.sale_id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{rupiah(subTotalOf(item))}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
