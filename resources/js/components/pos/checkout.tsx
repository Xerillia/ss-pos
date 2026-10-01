import { Receipt, X } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { rupiah } from "@/lib/rupiah";
import { useCartContext } from "./cart-context";
import { PaymentMethodSelector } from "./payment-method-selector";
import { QuickPayPresets } from "./quick-pay-presets";
import { CheckoutConfirmDialog } from "./checkout-confirm-dialog";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { WALK_IN_CUSTOMER } from "./customer-combobox";

interface CheckoutProps {
    total: number;
}

export default function Checkout({ total }: CheckoutProps) {
    const {
        payAmount,
        setPayAmount,
        cart,
        discountAmount,
        setDiscountAmount,
        finishTransaction,
        selectedCustomer,
        saleDate,
        setSaleDate,
    } = useCartContext();
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sanitize = (value: string) => {
        const sanitized = Number(value.replace(/[^0-9+]/g, ""));
        return isNaN(sanitized) ? 0 : sanitized;
    };

    const handleDiscountInput = (value: string) => {
        setDiscountAmount(sanitize(value));
    };

    const handlePayAmountInput = (value: string) => {
        setPayAmount(sanitize(value));
    };

    const handleFinish = async () => {
        setIsSubmitting(true);
        const toastId = toast.loading("Checking out...");

        try {
            const response = await finishTransaction();

            if (response.success) {
                toast.success(response.message, { id: toastId });

                router.reload({ only: ["products"] });
            } else {
                toast.error(response.message, { id: toastId });
            }
        } catch (err: any) {
            toast.error(
                err.message || "Failed to process cart. Contact Admin.",
                {
                    id: toastId,
                },
            );
        } finally {
            setIsSubmitting(false);
            setCheckoutOpen(false);
        }
    };

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
                    <AlertDialogHeader>
                        <div className="flex justify-between items-center w-full">
                            <AlertDialogTitle>{rupiah(total)}</AlertDialogTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCheckoutOpen(false)}
                            >
                                <X />
                            </Button>
                        </div>
                        <AlertDialogDescription>
                            {selectedCustomer?.name || WALK_IN_CUSTOMER.name}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <FieldSet>
                        <PaymentMethodSelector />

                        <Field className="w-fit">
                            <FieldLabel htmlFor="sale_date">
                                Sale Date
                            </FieldLabel>
                            <Input
                                type="datetime-local"
                                step="1"
                                id="sale_date"
                                value={saleDate}
                                onChange={(e) => setSaleDate(e.target.value)}
                            />
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
                                    value={discountAmount || 0}
                                    onChange={(e) =>
                                        handleDiscountInput(e.target.value)
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
                                    value={payAmount || 0}
                                    onChange={(e) =>
                                        handlePayAmountInput(e.target.value)
                                    }
                                    autoFocus
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <QuickPayPresets />

                    <div>
                        <Button
                            className="w-full"
                            onClick={() => setConfirmOpen(true)}
                        >
                            Pay
                        </Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <CheckoutConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                onFinish={handleFinish}
                disabled={isSubmitting}
            />
        </>
    );
}
