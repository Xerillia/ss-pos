import { CardContent } from "../ui/card";
import Checkout from "./checkout";
import { useCartContext } from "./cart-context";
import SummaryItem from "./summary-item";

export default function CartSummary() {
    const { cartTotal } = useCartContext();

    return (
        <CardContent className="mt-auto border-t py-4 sticky -bottom-6 bg-background -mb-6">
            <SummaryItem />

            <Checkout total={cartTotal()} />
        </CardContent>
    );
}
