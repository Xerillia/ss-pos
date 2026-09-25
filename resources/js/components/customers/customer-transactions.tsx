import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Sale } from "@/types/sale";
import { Separator } from "../ui/separator";
import { DataTable } from "./transactions/data-table";
import { columns } from "./transactions/columns";

interface CustomerTransactionsProps {
    sales: Sale[];
}

export default function CustomerTransactions({
    sales,
}: CustomerTransactionsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                    A record of all orders made by this customer.
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="mt-3">
                <DataTable columns={columns} data={sales} />
            </CardContent>
        </Card>
    );
}
