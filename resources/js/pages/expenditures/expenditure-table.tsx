import KeyValueRow from "@/components/key-value-row";
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
                    <KeyValueRow
                        label="Expense Number"
                        value={expenditure.expense_number}
                    />
                    <KeyValueRow
                        label="Category"
                        value={expenditure.category?.name ?? "Uncategorized"}
                    />
                    <KeyValueRow
                        label="User"
                        value={expenditure.user?.name ?? "Unknown"}
                    />
                    <KeyValueRow label="Name" value={expenditure.title} />
                    <KeyValueRow
                        label="Amount"
                        value={rupiah(Number(expenditure.amount))}
                    />
                    <KeyValueRow
                        label="Payment Method"
                        value={PaymentMethodUtils.label(
                            expenditure.payment_method,
                        )}
                    />
                    <KeyValueRow
                        label="Expense Date"
                        value={ymd(expenditure.expense_date)}
                    />
                    <KeyValueRow
                        label="Status"
                        value={PaymentStatusUtils.label(expenditure.status)}
                    />
                    <KeyValueRow
                        label="Reference Number"
                        value={expenditure.reference_number ?? ""}
                    />
                    <KeyValueRow
                        label="Notes"
                        value={expenditure.notes ?? "No notes yet."}
                    />
                    <KeyValueRow
                        label="Created At"
                        value={archive(expenditure.created_at)}
                    />
                    <KeyValueRow
                        label="Updated At"
                        value={archive(expenditure.updated_at)}
                    />
                </TableBody>
            </Table>
        </div>
    );
}
