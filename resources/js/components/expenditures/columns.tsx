import { DataTableFeatures } from "@/lib/data-table-features";
import { Expenditure } from "@/types/expenditure";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { rupiah } from "@/lib/rupiah";
import { PaymentMethodUtils, PaymentStatusUtils } from "@/enums";
import { archive } from "@/lib/archive";
import { statusVariantMap } from "@/lib/statusVariantMap";
import { styleVariants } from "@/lib/style";
import { Badge } from "../ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { destroyExpenditure, showExpenditure } from "@/routes/expenditure";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";

const columnHelper = createColumnHelper<DataTableFeatures, Expenditure>();

const handleDelete = (id: number) => {
    const toastId = toast.loading("Deleting expenditure...");

    try {
        router.delete(destroyExpenditure(id), {
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Expenditure deleted successfully!", {
                    id: toastId,
                });
            },
            onError: (error) => {
                toast.error(`Error: ${error.message}`, { id: toastId });
            },
        });
    } catch (error: any) {
        toast.error(error?.message ?? "Error deleting expenditure!", {
            id: toastId,
        });
    }
};

export const columns = columnHelper.columns([
    columnHelper.accessor("title", {
        header: "Title / Description",
        cell: (info) => (
            <div>
                <div className="font-medium text-foreground">
                    {info.getValue()}
                </div>
                {info.row.original.reference_number && (
                    <div className="text-xs text-muted-foreground">
                        {info.row.original.reference_number}
                    </div>
                )}
            </div>
        ),
    }),

    columnHelper.accessor("amount", {
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="-ml-3 h-8 text-xs font-medium"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Amount
                <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
            </Button>
        ),
        cell: (info) => {
            return (
                <span className="font-semibold font-mono">
                    {rupiah(Number(info.getValue()))}
                </span>
            );
        },
    }),

    columnHelper.accessor("payment_method", {
        header: "Method",
        cell: (info) => (
            <span className="capitalize text-xs font-medium">
                {PaymentMethodUtils.label(info.getValue())}
            </span>
        ),
    }),

    columnHelper.accessor("expense_date", {
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="-ml-3 h-8 text-xs font-medium"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Expense Date
                <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
            </Button>
        ),
        cell: (info) => archive(info.getValue()),
    }),

    columnHelper.accessor("status", {
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

    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const item = row.original;
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
                                <Link href={showExpenditure(item.id)}>
                                    <Eye className="mr-2 h-4 w-4" /> View
                                    Details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                {/* <Link href={route("expenditures.edit", item.id)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit Record
                                </Link> */}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="dark:text-rose-400 text-rose-600"
                                onClick={() => setOpen(true)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {" "}
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete{" "}
                                    <span className="font-semibold">
                                        {item.title}
                                    </span>{" "}
                                    from the server. Please confirm that you
                                    want to proceed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel variant="default">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            );
        },
    }),
]);
