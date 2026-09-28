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
                    <KeyValueRow label="Expense Number">
                        {expenditure.expense_number}
                    </KeyValueRow>
                    <KeyValueRow label="Category">
                        {expenditure.category?.name ?? "Uncategorized"}
                    </KeyValueRow>
                    <KeyValueRow label="User">
                        {expenditure.user?.name ?? "Unknown"}
                    </KeyValueRow>
                    <KeyValueRow label="Name">{expenditure.title}</KeyValueRow>
                    <KeyValueRow label="Amount">
                        {rupiah(Number(expenditure.amount))}
                    </KeyValueRow>
                    <KeyValueRow label="Payment Method">
                        {PaymentMethodUtils.label(expenditure.payment_method)}
                    </KeyValueRow>
                    <KeyValueRow label="Expense Date">
                        {ymd(expenditure.expense_date)}
                    </KeyValueRow>
                    <KeyValueRow label="Status">
                        {PaymentStatusUtils.label(expenditure.status)}
                    </KeyValueRow>
                    <KeyValueRow label="Reference Number">
                        {expenditure.reference_number ?? ""}
                    </KeyValueRow>
                    <KeyValueRow label="Notes">
                        {expenditure.notes ?? "No notes yet."}
                    </KeyValueRow>
                    <KeyValueRow label="Created At">
                        {archive(expenditure.created_at)}
                    </KeyValueRow>
                    <KeyValueRow label="Updated At">
                        {archive(expenditure.updated_at)}
                    </KeyValueRow>
                </TableBody>
            </Table>
        </div>
    );
}
