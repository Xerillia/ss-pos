import { columns } from "@/components/expenditures/columns";
import { DataTable } from "@/components/expenditures/data-table";
import { buttonVariants } from "@/components/ui/button";
import { createExpenditure } from "@/routes/expenditure";
import { Expenditure, ExpenseCategory } from "@/types/expenditure";
import { Head, Link } from "@inertiajs/react";
import { Banknote } from "lucide-react";

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
            <div className="m-4 space-y-4">
                <Link
                    as="button"
                    href={createExpenditure()}
                    className={buttonVariants({ size: "sm" })}
                >
                    <Banknote data-icon="inline-start" /> Add Expenditure
                </Link>

                <DataTable
                    filters={filters}
                    columns={columns as any}
                    pagination={expenditures}
                />
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
