import { rupiah } from "@/lib/rupiah";
import { CardContent } from "../ui/card";
import Checkout from "./checkout";
import { useCartContext } from "./cart-context";

export default function CartSummary() {
    const { cartTotalWithoutDiscount, cartTotal, discountAmount } =
        useCartContext();

    const withoutDiscount = cartTotalWithoutDiscount();
    const withDiscount = cartTotal();
    const saved = withoutDiscount - withDiscount - (discountAmount || 0);

    return (
        <CardContent className="mt-auto border-t py-4 sticky -bottom-6 bg-background -mb-6">
            <div className="flex text-xs flex-col text-muted-foreground">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p className="font-mono">{rupiah(withoutDiscount)}</p>
                </div>
                {saved > 0 && (
                    <div className="flex justify-between">
                        <p>Subtotal Discount</p>
                        <p className="font-mono">{rupiah(saved)}</p>
                    </div>
                )}
                {(discountAmount || 0) > 0 && (
                    <div className="flex justify-between">
                        <p>Cart Discount</p>
                        <p className="font-mono">
                            {rupiah(discountAmount as number)}
                        </p>
                    </div>
                )}
            </div>
            <div className="font-bold flex justify-between">
                <p>Total Amount</p>
                <p className="font-mono">{rupiah(withDiscount)}</p>
            </div>

            <Checkout total={cartTotal()} />
        </CardContent>
    );
}
