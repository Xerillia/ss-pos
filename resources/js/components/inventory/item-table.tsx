import { Product } from "@/types/product";
import { Table, TableBody, TableRow } from "../ui/table";
import ItemTableRow from "./item-table-row";
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
                    <ItemTableRow label="ID" value={product.id} />
                    <ItemTableRow label="Name" value={product.name} />
                    <ItemTableRow
                        label="Description"
                        value={product.description}
                    />
                    <ItemTableRow label="Price" value={rupiah(product.price)} />
                    <ItemTableRow label="Quantity" value={product.quantity} />
                    <ItemTableRow
                        label="Created At"
                        value={archive(product.created_at)}
                    />
                    <ItemTableRow
                        label="Updated At"
                        value={archive(product.updated_at)}
                    />
                </TableBody>
            </Table>
        </div>
    );
}
