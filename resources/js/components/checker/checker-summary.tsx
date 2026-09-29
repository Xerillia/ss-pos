import { rupiah } from "@/lib/rupiah";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

interface DisplayCardProps {
    start_date: string;
    end_date: string;
    starting_float: number;
    total_cash_sales: number;
    total_cash_expenditures: number;
    expected_cash: number;
}

export default function CheckerSummary({
    start_date,
    end_date,
    starting_float,
    total_cash_sales,
    total_cash_expenditures,
    expected_cash,
}: DisplayCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Summary</CardTitle>
                <CardDescription>{`Expected cash total from ${start_date} to ${end_date}`}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                        Starting Float
                    </span>
                    <span className="font-medium">
                        {rupiah(starting_float)}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">+ Cash Sales</span>
                    <span className="font-medium text-emerald-600">
                        +{rupiah(total_cash_sales)}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                        - Cash Expenditures
                    </span>
                    <span className="font-medium text-destructive">
                        -{rupiah(total_cash_expenditures)}
                    </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between items-center pt-1 font-semibold">
                    <span>Expected Cash</span>
                    <span className="text-lg">{rupiah(expected_cash)}</span>
                </div>
            </CardContent>
        </Card>
    );
}
