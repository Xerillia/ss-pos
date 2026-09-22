import { Banknote, Landmark, Receipt, X } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { rupiah } from "@/lib/rupiah";
import { useCartContext } from "./cart-context";
import { PaymentMethod, PaymentMethodUtils } from "@/enums";

interface CheckoutProps {
    total: number;
}

export default function Checkout({ total }: CheckoutProps) {
    const { paymentMethod, setPaymentMethod } = useCartContext();
    const [open, setOpen] = useState(false);

    const handlePay = () => {
        setOpen(false);
    };

    return (
        <>
            <Field className="mt-3">
                <Button onClick={() => setOpen(true)}>
                    <Receipt data-icon="inline-start" /> Checkout
                </Button>
            </Field>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className="flex justify-between items-center">
                        <AlertDialogTitle>{rupiah(total)}</AlertDialogTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setOpen(false)}
                        >
                            <X />
                        </Button>
                    </AlertDialogHeader>
                    <FieldSet>
                        <Field>
                            <p className="text-muted-foreground font-bold text-sm">
                                Payment Method:{" "}
                                {PaymentMethodUtils.label(
                                    paymentMethod as PaymentMethod,
                                )}
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setPaymentMethod(PaymentMethod.CASH)
                                    }
                                    disabled={
                                        paymentMethod === PaymentMethod.CASH
                                    }
                                    className={`${paymentMethod === PaymentMethod.CASH ? "disabled:opacity-100 text-amber-500 border-amber-500 dark:border-amber-500 dark:bg-amber-600/10 bg-amber-600/10" : ""}`}
                                >
                                    <Banknote data-icon="inline-start" />
                                    {PaymentMethodUtils.label(
                                        PaymentMethod.CASH,
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setPaymentMethod(PaymentMethod.TRANSFER)
                                    }
                                    disabled={
                                        paymentMethod === PaymentMethod.TRANSFER
                                    }
                                    className={`${paymentMethod === PaymentMethod.TRANSFER ? "disabled:opacity-100 text-amber-500 border-amber-500 dark:border-amber-500 dark:bg-amber-600/10 bg-amber-600/10" : ""}`}
                                >
                                    <Landmark data-icon="inline-start" />
                                    {PaymentMethodUtils.label(
                                        PaymentMethod.TRANSFER,
                                    )}
                                </Button>
                            </div>
                        </Field>
                        <FieldGroup className="grid grid-cols-2 gap-3">
                            <Field>
                                <FieldLabel
                                    htmlFor="order_discount"
                                    className="text-muted-foreground text-sm"
                                >
                                    Order Discount (Rp)
                                </FieldLabel>
                                <Input id="order_discount" placeholder="0" />
                            </Field>
                            <Field>
                                <FieldLabel
                                    htmlFor="paid_amount"
                                    className="text-muted-foreground text-sm"
                                >
                                    Paid Amount (Rp)
                                </FieldLabel>
                                <Input
                                    id="paid_amount"
                                    placeholder="0"
                                    autoFocus
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <div className="space-y-2">
                        <Button className="w-full" onClick={handlePay}>
                            Pay
                        </Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
