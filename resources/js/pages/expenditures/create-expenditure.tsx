import { expenditures } from "@/routes/expenditure";
import { Head } from "@inertiajs/react";

export default function CreateExpenditure() {
    return (
        <>
            <Head title="Create Expenditure" />
            <div className="m-4">Hi</div>
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
