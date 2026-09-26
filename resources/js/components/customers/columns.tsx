"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
    ArrowUpDown,
    CheckCircle2,
    Edit,
    Eye,
    MapPin,
    MoreHorizontal,
    Trash,
    XCircle,
} from "lucide-react";
import { type DataTableFeatures } from "@/lib/data-table-features";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { rupiah } from "@/lib/rupiah";
import { Badge } from "../ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Customer } from "@/types/customer";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { router, useForm } from "@inertiajs/react";
import { destroyCustomer, editCustomer, showCustomer } from "@/routes/customer";
import { toast } from "sonner";

const columnHelper = createColumnHelper<DataTableFeatures, Customer>();

export const columns = [
    columnHelper.accessor("name", {
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Customer <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => {
            const name = info.getValue();
            const notes = info.row.original.notes;
            const initials = name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{name}</span>
                        {notes && (
                            <span
                                className="text-xs text-muted-foreground truncate max-w-45"
                                title={notes}
                            >
                                {notes}
                            </span>
                        )}
                    </div>
                </div>
            );
        },
    }),

    columnHelper.display({
        id: "location",
        header: "Location",
        cell: (info) => {
            const { city, postal_code } = info.row.original;
            if (!city && !postal_code)
                return <span className="text-muted-foreground">—</span>;

            return (
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>
                        {city}
                        {postal_code ? `, ${postal_code}` : ""}
                    </span>
                </div>
            );
        },
    }),

    columnHelper.accessor("total_debt", {
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Total Debt <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => {
            const amount = Number(info.getValue()) || 0;

            return <div className="font-mono">{rupiah(amount)}</div>;
        },
    }),

    columnHelper.accessor("total_spent", {
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Total Spent <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => {
            const amount = Number(info.getValue()) || 0;

            return <div className="font-mono">{rupiah(amount)}</div>;
        },
    }),

    columnHelper.accessor("is_active", {
        header: () => <div className="text-center">Status</div>,
        cell: (info) => {
            const isActive = info.getValue();
            return (
                <div className="flex justify-center">
                    {isActive ? (
                        <Badge
                            variant="outline"
                            className="border-emerald-200 dark:border-emerald-800 
                            bg-emerald-50 dark:bg-emerald-950 
                            text-emerald-700 dark:text-emerald-300"
                        >
                            <CheckCircle2 data-icon="inline-start" />
                            Active
                        </Badge>
                    ) : (
                        <Badge
                            variant="secondary"
                            className="border-rose-200 dark:border-rose-800 
                            bg-rose-50 dark:bg-rose-950 
                            text-rose-700 dark:text-rose-300"
                        >
                            <XCircle data-icon="inline-start" />
                            Inactive
                        </Badge>
                    )}
                </div>
            );
        },
    }),

    columnHelper.display({
        id: "actions",
        cell: (info) => {
            const customer = info.row.original;

            const [open, setOpen] = useState(false);

            const { delete: destroy, processing } = useForm();

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

                        toast.success(
                            props.flash?.success || "Customer deleted!",
                            {
                                id: toastId,
                            },
                        );
                    },
                    onError: () =>
                        toast.error("An error has occured!", { id: toastId }),
                    onFinish: () => setOpen(false),
                });
            };

            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                className="gap-2"
                                onSelect={() =>
                                    router.visit(showCustomer(customer))
                                }
                            >
                                <Eye className="h-4 w-4" /> View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2"
                                onSelect={() =>
                                    router.visit(editCustomer(customer))
                                }
                            >
                                <Edit className="h-4 w-4" /> Edit Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2"
                                onSelect={() => setOpen(true)}
                            >
                                <Trash className="h-4 w-4" />
                                Delete
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
                                    This action cannot be undone. This will
                                    permanently delete{" "}
                                    <span className="font-semibold">
                                        {customer.name}
                                    </span>{" "}
                                    from the server. Please confirm that you
                                    want to proceed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <Button onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>

                                <form
                                    onSubmit={(e) => handleDelete(e, customer)}
                                >
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
                </div>
            );
        },
    }),
];
