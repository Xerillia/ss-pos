import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { useRefundContext } from "./refund-context";
import RefundTable from "./refund-table";

export default function RefundCard() {
    const {} = useRefundContext();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Refund Items</CardTitle>
                <CardDescription>
                    A list of items to be refunded
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RefundTable />
            </CardContent>
        </Card>
    );
}
