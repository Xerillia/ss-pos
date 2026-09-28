import ExpenditureForm from "@/components/expenditures/expenditure-form";
import { expenditures } from "@/routes/expenditure";
import { ExpenseCategory } from "@/types/expenditure";
import { Head } from "@inertiajs/react";

interface CreateExpenditureProps {
    categories: ExpenseCategory[];
}

export default function CreateExpenditure({
    categories,
}: CreateExpenditureProps) {
    return (
        <>
            <Head title="Create Expenditure" />
            <div className="m-4">
                <ExpenditureForm mode="create" categories={categories} />
            </div>
        </>
    );
}

CreateExpenditure.layout = {
    breadcrumbs: [
        {
            title: "Expenditures",
            href: expenditures(),
        },
        {
            title: "Create Expenditure",
        },
    ],
};
