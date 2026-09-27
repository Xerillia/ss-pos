import ItemTableRow from "@/components/inventory/item-table-row";
import { Table, TableBody } from "@/components/ui/table";
import { PaymentMethodUtils, PaymentStatusUtils } from "@/enums";
import { archive, ymd } from "@/lib/archive";
import { rupiah } from "@/lib/rupiah";
import { Expenditure } from "@/types/expenditure";

interface ExpenditureTableProps {
    expenditure: Expenditure;
}

export default function ExpenditureTable({
    expenditure,
}: ExpenditureTableProps) {
    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableBody>
                    <ItemTableRow
                        label="Expense Number"
                        value={expenditure.expense_number}
                    />
                    <ItemTableRow
                        label="Category"
                        value={expenditure.category?.name ?? "Uncategorized"}
                    />
                    <ItemTableRow
                        label="User"
                        value={expenditure.user?.name ?? "Unknown"}
                    />
                    <ItemTableRow label="Name" value={expenditure.title} />
                    <ItemTableRow
                        label="Amount"
                        value={rupiah(Number(expenditure.amount))}
                    />
                    <ItemTableRow
                        label="Payment Method"
                        value={PaymentMethodUtils.label(
                            expenditure.payment_method,
                        )}
                    />
                    <ItemTableRow
                        label="Expense Date"
                        value={ymd(expenditure.expense_date)}
                    />
                    <ItemTableRow
                        label="Status"
                        value={PaymentStatusUtils.label(expenditure.status)}
                    />
                    <ItemTableRow
                        label="Reference Number"
                        value={expenditure.reference_number ?? ""}
                    />
                    <ItemTableRow
                        label="Notes"
                        value={expenditure.notes ?? "No notes yet."}
                    />
                    <ItemTableRow
                        label="Created At"
                        value={archive(expenditure.created_at)}
                    />
                    <ItemTableRow
                        label="Updated At"
                        value={archive(expenditure.updated_at)}
                    />
                </TableBody>
            </Table>
        </div>
    );
}
