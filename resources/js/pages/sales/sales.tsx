import { columns, SaleRecord } from "@/components/sales/columns";
import { DataTable } from "@/components/sales/data-table";
import { Head } from "@inertiajs/react";

interface SalesProps {
    sales: {
        data: SaleRecord[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: { search: string; per_page: number };
}

export default function Sales({ sales, filters }: SalesProps) {
    return (
        <>
            <Head title="Sales" />
            <div className="m-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Sales Transactions
                    </h1>
                </div>

                <DataTable
                    columns={columns as any}
                    pagination={sales}
                    filters={filters}
                />
            </div>
        </>
    );
}

Sales.layout = {
    breadcrumbs: [
        {
            title: "Sales",
        },
    ],
};
