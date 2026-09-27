import { Product } from "@/types/product";
import { Table, TableBody, TableRow } from "../ui/table";
import KeyValueRow from "../key-value-row";
import { rupiah } from "@/lib/rupiah";
import { archive } from "@/lib/archive";

interface ItemTableProps {
    product: Product;
}

export default function ItemTable({ product }: ItemTableProps) {
    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableBody>
                    <KeyValueRow label="ID" value={product.id} />
                    <KeyValueRow label="Name" value={product.name} />
                    <KeyValueRow
                        label="Description"
                        value={product.description}
                    />
                    <KeyValueRow
                        label="Capital"
                        value={rupiah(product.capital)}
                    />
                    <KeyValueRow label="Price" value={rupiah(product.price)} />
                    <KeyValueRow label="Quantity" value={product.quantity} />
                    <KeyValueRow
                        label="Created At"
                        value={archive(product.created_at)}
                    />
                    <KeyValueRow
                        label="Updated At"
                        value={archive(product.updated_at)}
                    />
                </TableBody>
            </Table>
        </div>
    );
}
