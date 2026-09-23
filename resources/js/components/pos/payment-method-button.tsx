import { PaymentMethod, PaymentMethodUtils } from "@/enums";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { useCartContext } from "./cart-context";

interface PaymentMethodButtonProps {
    paymentMethod: string | undefined;
    label: PaymentMethod;
    children: ReactNode;
}

export default function PaymentMethodButton({
    paymentMethod,
    label,
    children,
}: PaymentMethodButtonProps) {
    const { setPaymentMethod } = useCartContext();

    return (
        <Button
            variant="outline"
            onClick={() => setPaymentMethod(label)}
            disabled={paymentMethod === label}
            className={`${paymentMethod === label ? "disabled:opacity-100 text-amber-500 border-amber-500 dark:border-amber-500 dark:bg-amber-600/10 bg-amber-600/10" : ""}`}
        >
            {children}
            {PaymentMethodUtils.label(label)}
        </Button>
    );
}
