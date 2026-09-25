import { Customer } from "@/types/customer";
import CustomerStatsItem from "./customer-stats-item";
import { rupiah } from "@/lib/rupiah";
import { DollarSign, HandCoins, ShoppingBag } from "lucide-react";
import { ymd } from "@/lib/archive";

interface CustomerStatsProps {
    customer: Customer;
    latest_sale?: string;
}

export default function CustomerStats({
    customer,
    latest_sale,
}: CustomerStatsProps) {
    return (
        <div className="grid grid-cols-3 gap-4">
            <CustomerStatsItem
                label="Total Spent"
                value={rupiah(customer.total_spent)}
                Icon={DollarSign}
            />
            <CustomerStatsItem
                label="Remaining Debt"
                value={rupiah(customer.total_debt || 0)}
                Icon={HandCoins}
            />
            <CustomerStatsItem
                label="Total Orders"
                value={customer.total_order || 0}
                Icon={ShoppingBag}
            >
                {latest_sale && (
                    <p>
                        Last order: <span>{ymd(latest_sale)}</span>
                    </p>
                )}
            </CustomerStatsItem>
        </div>
    );
}
