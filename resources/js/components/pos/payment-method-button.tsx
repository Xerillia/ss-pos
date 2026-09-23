import { PaymentMethod, PaymentMethodUtils } from "@/enums";
import { Button } from "../ui/button";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface PaymentMethodButtonProps {
    paymentMethod: string | undefined;
    setPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>;
    label: PaymentMethod;
    children: ReactNode;
}

export default function PaymentMethodButton({
    paymentMethod,
    setPaymentMethod,
    label,
    children,
}: PaymentMethodButtonProps) {
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
