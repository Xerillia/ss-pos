import { PaymentMethodUtils, PaymentStatus, PaymentStatusUtils } from "@/enums";
import { DataTableFeatures } from "@/lib/data-table-features";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { WALK_IN_CUSTOMER } from "../pos/customer-combobox";
import { rupiah } from "@/lib/rupiah";
import { Badge } from "../ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Eye, MoreHorizontal, Trash } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { destroySale, showSale } from "@/routes/sales";
import { Sale } from "@/types/sale";
import { useState } from "react";
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
import { toast } from "sonner";
import { styleVariants } from "@/lib/style";
import { VariantProps } from "class-variance-authority";

const columnHelper = createColumnHelper<DataTableFeatures, Sale>();

const handleDelete = (sale: Sale) => {
    const toastId = toast.loading("Deleting sale...");

    try {
        router.delete(destroySale(sale.id), {
            onSuccess: (page) => {
                const props = page.props as typeof page.props & {
                    flash?: { success?: string };
                };

                toast.success(
                    props.flash?.success || "Sale deleted successfully!",
                    {
                        id: toastId,
                    },
                );
            },
            onError: () => {
                toast.error("Failed to delete sale. Contact Admin.", {
                    id: toastId,
                });
            },
        });
    } catch (err: any) {
        toast.error(err.message || "Failed to delete sale. Contact Admin.", {
            id: toastId,
        });
    }
};

const statusVariantMap: Record<
    PaymentStatus,
    VariantProps<typeof styleVariants>["variant"]
> = {
    [PaymentStatus.PAID]: "green",
    [PaymentStatus.PARTIAL]: "yellow",
    [PaymentStatus.PARTIALLY_REFUNDED]: "yellow",
    [PaymentStatus.UNPAID]: "red",
};

export const columns = [
    // Sale Number
    columnHelper.accessor("sale_number", {
        header: "Sale Number",
        cell: (info) => (
            <span className="font-mono font-medium">{info.getValue()}</span>
        ),
    }),

    // Customer
    columnHelper.accessor(
        (row) => row.customer?.name || WALK_IN_CUSTOMER.name,
        {
            id: "customer",
            header: "Customer",
        },
    ),

    // Cashier
    columnHelper.accessor((row) => row.user?.name || "System", {
        id: "user",
        header: "Cashier",
    }),

    // Payment Method
    columnHelper.accessor("payment_method", {
        header: "Payment Method",
        cell: (info) => (
            <span className="capitalize">
                {PaymentMethodUtils.label(info.getValue())}
            </span>
        ),
    }),

    // Total Amount
    columnHelper.accessor("total_amount", {
        header: "Total",
        cell: (info) => {
            return (
                <span className="font-semibold font-mono">
                    {rupiah(info.getValue())}
                </span>
            );
        },
    }),

    // Status
    columnHelper.accessor("payment_status", {
        header: "Status",
        cell: (info) => {
            const status = info.getValue();

            const variant = statusVariantMap[status] ?? "red";
            const className = styleVariants({ variant });

            return (
                <Badge className={className}>
                    {PaymentStatusUtils.label(status)}
                </Badge>
            );
        },
    }),

    // Actions Column
    columnHelper.display({
        id: "actions",
        header: () => {},
        cell: ({ row }) => {
            const sale = row.original;

            const [open, setOpen] = useState(false);
            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={showSale(sale.id)}
                                    className="cursor-pointer flex items-center"
                                >
                                    <Eye className="mr-2 h-4 w-4" /> View / Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setOpen(true)}
                                className="dark:text-rose-400 text-rose-600 cursor-pointer flex items-center"
                            >
                                <Trash className="mr-2 h-4 w-4" /> Delete Sale
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Deleting this sale will restore item stock.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel variant="default">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    variant="destructive"
                                    onClick={() => handleDelete(sale)}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            );
        },
    }),
];
