import { expenditures } from "@/routes/expenditure";
import { Expenditure } from "@/types/expenditure";

interface ShowExpenditureProps {
    expenditure: Expenditure;
}

export default function ShowExpenditure({ expenditure }: ShowExpenditureProps) {
    return <p>Hi</p>;
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
