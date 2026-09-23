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

interface CheckoutConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onFinish: () => void;
}

export function CheckoutConfirmDialog({
    open,
    onOpenChange,
    onFinish,
}: CheckoutConfirmDialogProps) {
    const { selectedCustomer, payAmount, cartTotal } = useCartContext();

    const total = cartTotal();
    const currentPayAmount = payAmount || 0;
    const change = currentPayAmount - total;
    const debt = total - currentPayAmount;

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        {selectedCustomer?.name || WALK_IN_CUSTOMER.name}
                    </AlertDialogDescription>
                </AlertDialogHeader>

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
                    <AlertDialogCancel>Return</AlertDialogCancel>
                    <AlertDialogAction onClick={onFinish}>
                        Finish
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
