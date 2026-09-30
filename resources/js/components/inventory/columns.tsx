"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "../../lib/data-table-features";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Product } from "@/types/product";
import { rupiah } from "@/lib/rupiah";
import { archive } from "@/lib/archive";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { router } from "@inertiajs/react";
import { editItem } from "@/routes/product";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import DeleteDialogContent from "./delete-dialog-content";
import { useState } from "react";

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export const columns = columnHelper.columns([
    columnHelper.accessor("name", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("price", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"));
            const formatted = rupiah(amount);
            return formatted;
        },
    }),

    columnHelper.accessor("quantity", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: (info) => <p className="text-center">{info.getValue()}</p>,
    }),

    columnHelper.accessor("created_at", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <p className="text-center">{archive(row.getValue("created_at"))}</p>
        ),
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const product = row.original;
            const [open, setOpen] = useState(false);
            const [dropdownOpen, setDropdownOpen] = useState(false);

            const handleClose = () => {
                setOpen(false);
                setDropdownOpen(false);
            };
            return (
                <div
                    className="flex justify-center gap-2 -m-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <DropdownMenu
                        open={dropdownOpen}
                        onOpenChange={setDropdownOpen}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-2">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="text-xs text-muted-foreground">
                                Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                                onSelect={() => router.visit(editItem(product))}
                            >
                                <Edit /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger className="flex gap-2 items-center">
                                        <Trash /> Delete
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DeleteDialogContent
                                            product={product}
                                            handleClose={handleClose}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    }),
]);
