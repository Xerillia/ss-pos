import { rupiah } from "@/lib/rupiah";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { useCartContext } from "./cart-context";

export default function CartItemsCompact() {
    const { cart } = useCartContext();

    return (
        <Table>
            <TableBody>
                {cart.map((item) => {
                    const appliedUnitDiscount = Math.max(
                        0,
                        item.product.price - (item.unit_discount || 0),
                    );

                    const appliedTotalDiscount = Math.max(
                        0,
                        appliedUnitDiscount * item.quantity -
                            (item.flat_discount || 0),
                    );

                    return (
                        <TableRow
                            key={item.product.id}
                            className="h-auto border-none hover:bg-inherit text-muted-foreground truncate text-xs"
                        >
                            <TableCell className="text-left -m-2 p-0">
                                {item.product.name}
                            </TableCell>
                            <TableCell className="text-center font-mono -m-2 p-0">
                                {rupiah(item.product.price)}
                            </TableCell>
                            <TableCell className="text-center font-mono -m-2 p-0">
                                {item.unit_discount > 0 &&
                                    rupiah(-item.unit_discount)}
                            </TableCell>
                            <TableCell className="text-center font-mono -m-2 p-0">
                                {item.quantity}
                            </TableCell>
                            <TableCell className="text-center font-mono -m-2 p-0">
                                {item.flat_discount > 0 &&
                                    rupiah(-item.flat_discount)}
                            </TableCell>
                            <TableCell className="text-right font-mono -m-2 p-0">
                                {rupiah(appliedTotalDiscount)}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
