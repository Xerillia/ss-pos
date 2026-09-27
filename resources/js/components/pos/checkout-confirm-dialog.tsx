import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { rupiah } from "@/lib/rupiah";
import SummaryItem from "./summary-item";
import { useCartContext } from "./cart-context";
import { WALK_IN_CUSTOMER } from "./customer-combobox";
import CartItemsCompact from "./cart-items-compact";
import { PaymentMethod, PaymentMethodUtils } from "@/enums";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface CheckoutConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onFinish: () => void;
    disabled: boolean;
}

export function CheckoutConfirmDialog({
    open,
    onOpenChange,
    onFinish,
    disabled,
}: CheckoutConfirmDialogProps) {
    const {
        selectedCustomer,
        payAmount,
        cartTotal,
        paymentMethod,
        saleNumber,
        setSaleNumber,
    } = useCartContext();

    const total = cartTotal();
    const currentPayAmount = payAmount || 0;
    const change = currentPayAmount - total;
    const debt = total - currentPayAmount;

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle asChild>
                        <div className="flex justify-between w-full items-center">
                            <p>Confirmation</p>
                            <p>
                                {PaymentMethodUtils.label(
                                    paymentMethod as PaymentMethod,
                                )}
                            </p>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {selectedCustomer?.name || WALK_IN_CUSTOMER.name}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <Field>
                    <FieldLabel
                        htmlFor="sale_number"
                        className="text-muted-foreground text-xs"
                    >
                        Sale Number
                    </FieldLabel>
                    <Input
                        id="sale_number"
                        placeholder="A00000"
                        value={saleNumber}
                        onChange={(e) => setSaleNumber(e.target.value)}
                    />
                </Field>

                <CartItemsCompact />

                <SummaryItem />

                <div className="flex font-bold justify-between">
                    <p>Paid Amount</p>
                    <p className="font-mono">{rupiah(currentPayAmount)}</p>
                </div>

                {change > 0 && (
                    <div className="flex font-bold dark:text-emerald-400 text-emerald-600 justify-between">
                        <p>Change Due</p>
                        <p className="font-mono">{rupiah(change)}</p>
                    </div>
                )}

                {debt > 0 && (
                    <div className="flex font-bold dark:text-rose-400 text-rose-600 justify-between">
                        <p>Debt</p>
                        <p className="font-mono">{rupiah(debt)}</p>
                    </div>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={disabled}>
                        Return
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onFinish} disabled={disabled}>
                        Finish
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
