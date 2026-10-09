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
import { Input } from "@/components/ui/input";

export default function RefundTable() {
    const {
        subTotalOf,
        refundCart,
        removeFromRefund,
        increment,
        decrement,
        getReason,
        setReason,
    } = useRefundContext();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead />
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead>Refund</TableHead>
                    <TableHead>Reason (optional)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {refundCart.map((item) => {
                    const product = item.product;
                    return (
                        <TableRow key={item.id}>
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
                            <TableCell>
                                <Input
                                    id={`reason-${item.id}`}
                                    type="text"
                                    placeholder="Reason..."
                                    value={getReason(item)}
                                    onChange={(e) =>
                                        setReason(item, e.target.value)
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
