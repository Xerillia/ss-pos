import { Expenditure } from "@/types/expenditure";

interface ShowExpenditureProps {
    expenditure: Expenditure;
}

export default function ShowExpenditure({ expenditure }: ShowExpenditureProps) {
    return <p>Hi</p>;
}
