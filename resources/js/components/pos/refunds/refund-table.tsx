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
import { Minus, Plus, Trash } from "lucide-react";

export default function RefundTable() {
    const { subTotalOf, refundCart, removeFromRefund, increment, decrement } =
        useRefundContext();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead />
                    <TableHead>Sale ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
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
                            <TableCell className="text-center">
                                <div className="flex gap-4 items-center mx-auto w-max">
                                    <Button
                                        size="xs"
                                        className="aspect-square"
                                        onClick={() => decrement(item)}
                                    >
                                        <Minus />
                                    </Button>
                                    <p>{item.quantity}</p>
                                    <Button
                                        size="xs"
                                        className="aspect-square"
                                        onClick={() => increment(item)}
                                    >
                                        <Plus />
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell>{rupiah(subTotalOf(item))}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
