import CustomerStats from "@/components/customers/customer-stats";
import CustomerTabs from "@/components/customers/customer-tabs";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { customers, destroyCustomer, editCustomer } from "@/routes/customer";
import { Customer } from "@/types/customer";
import { Sale } from "@/types/sale";
import { Head, router, useForm } from "@inertiajs/react";
import { Edit, Trash, Undo2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShowCustomerProps {
    customer: Customer;
    sales: {
        data: Sale[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function ShowCustomer({ customer, sales }: ShowCustomerProps) {
    const [open, setOpen] = useState(false);
    const { delete: destroy, processing } = useForm();

    const handleCancel = () => {
        if (window.history.length <= 2) {
            router.visit(customers());
        } else {
            window.history.back();
        }
    };

    const handleDelete = (
        e: React.SubmitEvent<HTMLFormElement>,
        customer: Customer,
    ) => {
        e.preventDefault();

        const toastId = toast.loading("Deleting customer...");

        destroy(destroyCustomer(customer).url, {
            onSuccess: (page) => {
                const props = page.props as typeof page.props & {
                    flash?: { success?: string };
                };

                toast.success(props.flash?.success || "Customer deleted!", {
                    id: toastId,
                });
            },
            onError: () =>
                toast.error("An error has occured!", { id: toastId }),
            onFinish: () => setOpen(false),
        });
    };

    return (
        <>
            <Head title={`Customer ${customer.name}`} />
            <div className="m-4 space-y-4">
                <div className="flex justify-between items-center">
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleCancel}
                    >
                        <Undo2 /> Return
                    </Button>

                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            onClick={() => router.visit(editCustomer(customer))}
                        >
                            <Edit /> Edit Customer
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setOpen(true)}
                        >
                            <Trash /> Delete Customer
                        </Button>
                    </div>
                </div>

                <CustomerStats customer={customer} />

                <CustomerTabs customer={customer} sales={sales.data} />
            </div>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete{" "}
                            <span className="font-semibold">
                                {customer.name}
                            </span>{" "}
                            from the server. Please confirm that you want to
                            proceed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>

                        <form onSubmit={(e) => handleDelete(e, customer)}>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={processing}
                            >
                                Delete
                            </Button>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

ShowCustomer.layout = (page: any) => {
    return {
        breadcrumbs: [
            {
                title: "Customers",
                href: customers(),
            },
            {
                title: page.customer.name,
            },
        ],
    };
};
