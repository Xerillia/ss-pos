import { Head } from "@inertiajs/react";
import { useState } from "react";

interface RegisterSummary {
    starting_float: number;
    total_cash_sales: number;
    total_cash_expenditures: number;
    expected_cash: number;
}

interface RegisterCheckerProps {
    summary: RegisterSummary;
}

export default function RegisterChecker({ summary }: RegisterCheckerProps) {
    const [countedCash, setCountedCash] = useState<number>(0);

    const discrepancy = countedCash - summary.expected_cash;

    return (
        <>
            <Head title="Register Checker" />
            <div className="m-4 space-y-4">
                <p>{summary.starting_float}</p>
                <p>{summary.total_cash_sales}</p>
                <p>{summary.total_cash_expenditures}</p>
                <p>{summary.expected_cash}</p>
            </div>
        </>
    );
}

RegisterChecker.layout = {
    breadcrumbs: [
        {
            title: "Register Checker",
        },
    ],
};
