import { columns } from "@/components/sales/columns";
import { DataTable } from "@/components/sales/data-table";
import { Sale } from "@/types/sale";
import { Head } from "@inertiajs/react";

interface SalesProps {
    sales: {
        data: Sale[];
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
