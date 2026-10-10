import { rupiah } from "@/lib/rupiah";
import { useCartContext } from "./cart-context";
import { useRefundContext } from "./refunds/refund-context";

export default function SummaryItem() {
    const { cartTotal, cartTotalWithoutDiscount, discountAmount } =
        useCartContext();

    const { totalRefund } = useRefundContext();

    const withoutDiscount = cartTotalWithoutDiscount();
    const withDiscount = cartTotal();
    const saved = withoutDiscount - withDiscount - (discountAmount || 0);
    const refund = totalRefund();
    const total = withDiscount - refund;

    return (
        <>
            <div className="flex text-xs flex-col text-muted-foreground">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p className="font-mono">{rupiah(withoutDiscount)}</p>
                </div>
                {saved > 0 && (
                    <div className="flex justify-between">
                        <p>Discount</p>
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
                {refund > 0 && (
                    <div className="flex justify-between">
                        <p>Refund</p>
                        <p className="font-mono">{rupiah(refund)}</p>
                    </div>
                )}
            </div>
            <div className="font-bold flex justify-between">
                <p>Total Amount</p>
                <p className="font-mono">{rupiah(total)}</p>
            </div>
        </>
    );
}
