import { Banknote, Landmark, Receipt, X } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { rupiah } from "@/lib/rupiah";
import { useCartContext } from "./cart-context";
import { PaymentMethod, PaymentMethodUtils } from "@/enums";
import PaymentMethodButton from "./payment-method-button";
import SummaryItem from "./summary-item";

interface CheckoutProps {
    total: number;
}

export default function Checkout({ total }: CheckoutProps) {
    const {
        paymentMethod,
        setPaymentMethod,
        payAmount,
        setPayAmount,
        cart,
        discountAmount,
        setDiscountAmount,
        cartTotal,
    } = useCartContext();
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const change = (payAmount || 0) - cartTotal();
    const debt = cartTotal() - (payAmount || 0);

    const handleFinish = () => {};

    return (
        <>
            <Field className="mt-3">
                <Button
                    onClick={() => setCheckoutOpen(true)}
                    disabled={cart.length === 0}
                >
                    <Receipt data-icon="inline-start" /> Checkout
                </Button>
            </Field>

            <AlertDialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className="flex justify-between items-center">
                        <AlertDialogTitle>{rupiah(total)}</AlertDialogTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCheckoutOpen(false)}
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
                                <PaymentMethodButton
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    label={PaymentMethod.CASH}
                                >
                                    <Banknote data-icon="inline-start" />
                                </PaymentMethodButton>
                                <PaymentMethodButton
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    label={PaymentMethod.TRANSFER_BCA}
                                >
                                    <Landmark data-icon="inline-start" />
                                </PaymentMethodButton>
                                <PaymentMethodButton
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    label={PaymentMethod.TRANSFER_BRI}
                                >
                                    <Landmark data-icon="inline-start" />
                                </PaymentMethodButton>
                                <PaymentMethodButton
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    label={PaymentMethod.TRANSFER_MANDIRI}
                                >
                                    <Landmark data-icon="inline-start" />
                                </PaymentMethodButton>
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
                                <Input
                                    id="order_discount"
                                    placeholder="0"
                                    value={discountAmount}
                                    onChange={(e) =>
                                        setDiscountAmount(
                                            Number(e.target.value),
                                        )
                                    }
                                />
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
                                    value={payAmount}
                                    onChange={(e) =>
                                        setPayAmount(Number(e.target.value))
                                    }
                                    autoFocus
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <div className="space-y-2">
                        <Button
                            className="w-full"
                            onClick={() => setConfirmOpen(true)}
                        >
                            Pay
                        </Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    </AlertDialogHeader>
                    <SummaryItem />
                    <div className="flex font-bold justify-between">
                        <p>Paid Amount</p>
                        <p className="font-mono">{rupiah(payAmount || 0)}</p>
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
                        <AlertDialogAction onClick={handleFinish}>
                            Finish
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
