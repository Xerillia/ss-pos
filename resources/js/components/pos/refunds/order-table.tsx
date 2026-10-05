import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/number";
import { rupiah } from "@/lib/rupiah";
import { Sale } from "@/types/sale";
import { Redo } from "lucide-react";
import { useRefundContext } from "./refund-context";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface OrderTableProps {
    sale: Sale;
}

export default function OrderTable({ sale }: OrderTableProps) {
    const { addToRefund } = useRefundContext();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Product</TableHead>
                    <TableHead className="text-center">Unit Price</TableHead>
                    <TableHead className="text-center">Unit Disc</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-center">Flat Disc</TableHead>
                    <TableHead className="text-center">Subtotal</TableHead>
                    <TableHead />
                </TableRow>
            </TableHeader>
            <TableBody className="divide-y">
                {sale.sale_products?.map((sale_product) => (
                    <TableRow key={sale_product.id}>
                        <TableCell className="font-medium text-center">
                            {sale_product.product_name}
                        </TableCell>
                        <TableCell className="text-center font-mono">
                            {rupiah(sale_product.unit_price)}
                        </TableCell>
                        <TableCell className="text-center font-mono">
                            {sale_product.unit_discount > 0
                                ? rupiah(sale_product.unit_discount)
                                : ""}
                        </TableCell>
                        <TableCell className="text-center">
                            {formatNumber(sale_product.quantity)}
                        </TableCell>
                        <TableCell className="text-center font-mono">
                            {sale_product.flat_discount > 0
                                ? rupiah(sale_product.flat_discount)
                                : ""}
                        </TableCell>
                        <TableCell className="text-center font-mono">
                            {rupiah(sale_product.total_price)}
                        </TableCell>
                        <TableCell>
                            <Button
                                size="xs"
                                className="w-6.5 h-6.5"
                                onClick={() => addToRefund(sale_product)}
                            >
                                <Redo />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
