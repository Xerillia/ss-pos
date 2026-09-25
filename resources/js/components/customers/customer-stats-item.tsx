import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { LucideIcon } from "lucide-react";

interface CustomerStatsItem {
    label: string;
    value: string | number;
    children?: ReactNode;
    Icon: LucideIcon;
}

export default function CustomerStatsItem({
    label,
    value,
    children,
    Icon,
}: CustomerStatsItem) {
    return (
        <Card>
            <CardContent className="flex justify-between items-center">
                <div className="space-y-2">
                    <p className="text-muted-foreground font-semibold uppercase text-sm">
                        {label}
                    </p>
                    <p className="text-lg font-bold">{value}</p>
                    {children}
                </div>
                <Icon
                    data-icon="inline-start"
                    className="border p-3 w-12 h-12 rounded-md"
                />
            </CardContent>
        </Card>
    );
}
