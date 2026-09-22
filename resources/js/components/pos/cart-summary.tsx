import { rupiah } from "@/lib/rupiah";
import { CardContent } from "../ui/card";
import Checkout from "./checkout";
interface CartSummaryProps {
    total: number;
}

export default function CartSummary({ total }: CartSummaryProps) {
    return (
        <CardContent className="mt-auto border-t py-4 sticky -bottom-6 bg-background -mb-6">
            <div className="font-bold flex justify-between">
                <p>Total Amount</p>
                <p className="font-mono">{rupiah(total)}</p>
            </div>

            <Checkout total={total} />
        </CardContent>
    );
}
