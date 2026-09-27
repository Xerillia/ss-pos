import { columns } from "@/components/expenditures/columns";
import { DataTable } from "@/components/expenditures/data-table";
import { Expenditure, ExpenseCategory } from "@/types/expenditure";
import { Head } from "@inertiajs/react";

interface ExpendituresProps {
    expenditures: {
        data: Expenditure[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    categories: ExpenseCategory[];
    filters: any;
}

export default function Expenditures({
    expenditures,
    categories,
    filters,
}: ExpendituresProps) {
    return (
        <>
            <Head title="Expenditures" />
            <div className="m-4">
                <DataTable columns={columns} data={expenditures.data} />
            </div>
        </>
    );
}

Expenditures.layout = {
    breadcrumbs: [
        {
            title: "Expenditures",
        },
    ],
};
