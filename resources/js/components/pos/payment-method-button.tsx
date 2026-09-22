import { PaymentMethod, PaymentMethodUtils } from "@/enums";
import { Banknote } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

interface PaymentMethodButtonProps {
    paymentMethod: string | undefined;
    setPaymentMethod: Dispatch<SetStateAction<PaymentMethod | undefined>>;
    label: PaymentMethod;
}

export default function PaymentMethodButton({
    paymentMethod,
    setPaymentMethod,
    label,
}: PaymentMethodButtonProps) {
    return (
        <Button
            variant="outline"
            onClick={() => setPaymentMethod(label)}
            disabled={paymentMethod === label}
            className={`${paymentMethod === label ? "disabled:opacity-100 text-amber-500 border-amber-500 dark:border-amber-500 dark:bg-amber-600/10 bg-amber-600/10" : ""}`}
        >
            <Banknote data-icon="inline-start" />
            {PaymentMethodUtils.label(label)}
        </Button>
    );
}
