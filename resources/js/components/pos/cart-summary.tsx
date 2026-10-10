import { CardContent } from "../ui/card";
import Checkout from "./checkout";
import SummaryItem from "./summary-item";

export default function CartSummary() {
    return (
        <CardContent className="mt-auto border-t py-4 sticky -bottom-6 bg-background -mb-6">
            <SummaryItem />
            <Checkout />
        </CardContent>
    );
}
