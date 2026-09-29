import { rupiah } from "@/lib/rupiah";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

interface DiscrepancyBannerProps {
    discrepancy: number;
    className?: string;
}

export default function DiscrepancyBanner({
    discrepancy,
    className,
}: DiscrepancyBannerProps) {
    return (
        <Card
            className={`border transition-colors ${className} ${
                discrepancy === 0
                    ? "dark:bg-emerald-950 bg-emerald-100 border-emerald-500"
                    : discrepancy > 0
                      ? "dark:bg-amber-950 bg-amber-100 border-amber-500"
                      : "bg-rose-100 dark:bg-rose-950 border-rose-500"
            }`}
        >
            <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                            {discrepancy === 0 && "Drawer Balanced"}
                            {discrepancy > 0 && "Drawer Over"}
                            {discrepancy < 0 && "Drawer Short"}
                        </span>
                        <Badge
                            variant="outline"
                            className="capitalize border-black dark:border-white"
                        >
                            {discrepancy === 0
                                ? "Exact Match"
                                : discrepancy > 0
                                  ? "Over"
                                  : "Short"}
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {discrepancy === 0
                            ? "Physical count matches the system expected cash."
                            : "Review transactions or recount physical bills."}
                    </p>
                </div>

                <div className="text-right">
                    <span className="block text-xs uppercase font-medium text-muted-foreground">
                        Variance
                    </span>
                    <span
                        className={`text-lg font-bold ${
                            discrepancy === 0
                                ? "text-foreground"
                                : discrepancy > 0
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-destructive"
                        }`}
                    >
                        {discrepancy > 0 && "+"}
                        {rupiah(discrepancy)}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
