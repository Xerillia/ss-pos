import { formatNumber } from "@/lib/number";
import { rupiah } from "@/lib/rupiah";
import { Sale } from "@/types/sale";

interface ShowSaleTableProps {
    sale: Sale;
}

export default function ShowSaleTable({ sale }: ShowSaleTableProps) {
    return (
        <table className="w-full text-left text-sm">
            <thead className="bg-muted">
                <tr>
                    <th className="p-3 text-center">Product</th>
                    <th className="p-3 text-center">Unit Price</th>
                    <th className="p-3 text-center">Unit Discount</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-center">Flat Discount</th>
                    <th className="p-3 text-center">Subtotal</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {sale.sale_products?.map((sale_product) => (
                    <tr key={sale_product.id}>
                        <td className="p-3 font-medium text-center">
                            {sale_product.product_name}
                        </td>
                        <td className="p-3 text-center font-mono">
                            {rupiah(sale_product.unit_price)}
                        </td>
                        <td className="p-3 text-center font-mono">
                            {sale_product.unit_discount > 0
                                ? rupiah(sale_product.unit_discount)
                                : ""}
                        </td>
                        <td className="p-3 text-center">
                            {formatNumber(sale_product.quantity)}
                        </td>
                        <td className="p-3 text-center font-mono">
                            {sale_product.flat_discount > 0
                                ? rupiah(sale_product.flat_discount)
                                : ""}
                        </td>
                        <td className="p-3 text-center font-mono">
                            {rupiah(sale_product.total_price)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
