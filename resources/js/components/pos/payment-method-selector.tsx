import { Banknote, Landmark } from "lucide-react";
import { Field, FieldLabel } from "../ui/field";
import { PaymentMethod, PaymentMethodUtils } from "@/enums";
import PaymentMethodButton from "./payment-method-button";
import { useCartContext } from "./cart-context";

const PAYMENT_OPTIONS = [
    { method: PaymentMethod.CASH, Icon: Banknote },
    { method: PaymentMethod.TRANSFER_BCA, Icon: Landmark },
    { method: PaymentMethod.TRANSFER_BRI, Icon: Landmark },
    { method: PaymentMethod.TRANSFER_MANDIRI, Icon: Landmark },
];

export function PaymentMethodSelector() {
    const { paymentMethod } = useCartContext();

    return (
        <Field>
            <FieldLabel className="text-muted-foreground font-bold text-sm">
                Payment Method:{" "}
                {PaymentMethodUtils.label(paymentMethod as PaymentMethod)}
            </FieldLabel>
            <div className="grid grid-cols-2 gap-3 mt-1.5">
                {PAYMENT_OPTIONS.map(({ method, Icon }) => (
                    <PaymentMethodButton
                        key={method}
                        paymentMethod={paymentMethod}
                        label={method}
                    >
                        <Icon data-icon="inline-start" />
                    </PaymentMethodButton>
                ))}
            </div>
        </Field>
    );
}
