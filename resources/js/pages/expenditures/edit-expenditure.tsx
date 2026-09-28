import ExpenditureForm from "@/components/expenditures/expenditure-form";
import { expenditures } from "@/routes/expenditure";
import { Expenditure, ExpenseCategory } from "@/types/expenditure";
import { Head } from "@inertiajs/react";

interface EditExpenditureProps {
    expenditure: Expenditure;
    categories: ExpenseCategory[];
}

export default function EditExpenditure({
    expenditure,
    categories,
}: EditExpenditureProps) {
    return (
        <>
            <Head title="Edit Expenditure" />
            <div className="m-4 space-y-4">
                <ExpenditureForm
                    mode="edit"
                    categories={categories}
                    expenditure={expenditure}
                />
            </div>
        </>
    );
}

EditExpenditure.layout = (page: any) => {
    return {
        breadcrumbs: [
            {
                title: "Expenditures",
                href: expenditures(),
            },
            {
                title: `${page.expenditure.title} (editing)`,
            },
        ],
    };
};
