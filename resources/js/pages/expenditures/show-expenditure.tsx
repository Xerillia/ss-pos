import { buttonVariants } from "@/components/ui/button";
import { expenditures } from "@/routes/expenditure";
import { Expenditure } from "@/types/expenditure";
import { Head, Link } from "@inertiajs/react";
import { Undo2 } from "lucide-react";
import ExpenditureTable from "./expenditure-table";

interface ShowExpenditureProps {
    expenditure: Expenditure;
}

export default function ShowExpenditure({ expenditure }: ShowExpenditureProps) {
    return (
        <>
            <Head title={expenditure.title} />
            <div className="m-4 space-y-4">
                <div className="flex justify-between">
                    <Link
                        href={expenditures()}
                        className={buttonVariants({ size: "sm" })}
                    >
                        <Undo2 /> Return
                    </Link>

                    {/* <ItemAction product={product} /> */}
                </div>

                <ExpenditureTable expenditure={expenditure} />
            </div>
        </>
    );
}

ShowExpenditure.layout = (page: any) => {
    return {
        breadcrumbs: [
            {
                title: "Expenditures",
                href: expenditures(),
            },
            {
                title: page.expenditure.title,
            },
        ],
    };
};
