import CheckerInput from "@/components/checker/checker-input";
import CheckerSummary from "@/components/checker/checker-summary";
import DiscrepancyBanner from "@/components/checker/discrepancy-banner";
import { Field } from "@/components/ui/field";
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
    filters: {
        start_date: string;
        end_date: string;
        starting_float: number;
    };
}

export default function RegisterChecker({
    summary,
    filters,
}: RegisterCheckerProps) {
    const [countedCash, setCountedCash] = useState<number>(0);

    // const [startDate, setStartDate] =

    const discrepancy = countedCash - summary.expected_cash;

    return (
        <>
            <Head title="Register Checker" />
            <div className="m-4 space-y-4">
                <CheckerSummary
                    start_date={filters.start_date}
                    end_date={filters.end_date}
                    starting_float={filters.starting_float}
                    total_cash_sales={summary.total_cash_sales}
                    total_cash_expenditures={summary.total_cash_expenditures}
                    expected_cash={summary.expected_cash}
                />
                <CheckerInput setCountedCash={setCountedCash} />
                <DiscrepancyBanner discrepancy={discrepancy} />
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
