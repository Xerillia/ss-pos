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
                    <KeyValueRow label="ID">{product.id}</KeyValueRow>
                    <KeyValueRow label="Name">{product.name}</KeyValueRow>
                    <KeyValueRow label="Description">
                        {product.description}
                    </KeyValueRow>
                    <KeyValueRow label="Capital">
                        {rupiah(product.capital)}
                    </KeyValueRow>
                    <KeyValueRow label="Price">
                        {rupiah(product.price)}
                    </KeyValueRow>
                    <KeyValueRow label="Quantity">
                        {product.quantity}
                    </KeyValueRow>
                    <KeyValueRow label="Created At">
                        {archive(product.created_at)}
                    </KeyValueRow>
                    <KeyValueRow label="Updated At">
                        {archive(product.updated_at)}
                    </KeyValueRow>
                </TableBody>
            </Table>
        </div>
    );
}
