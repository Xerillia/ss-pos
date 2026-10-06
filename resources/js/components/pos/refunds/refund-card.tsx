import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { useRefundContext } from "./refund-context";
import RefundTable from "./refund-table";
import { rupiah } from "@/lib/rupiah";

export default function RefundCard() {
    const { totalRefund } = useRefundContext();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Refund Items</CardTitle>
                <CardDescription>
                    A list of items to be refunded
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="font-semibold text-sm text-muted-foreground w-max grid grid-cols-2 items-center space-x-4 ml-auto">
                    <p>Total Refund:</p>
                    <p className="font-mono">{rupiah(totalRefund())}</p>
                </div>
                <RefundTable />
            </CardContent>
        </Card>
    );
}
