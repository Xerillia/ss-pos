"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import dayjs from "dayjs";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Product } from "@/types/product";
import { editItem } from "@/routes/product";
import { Link } from "@inertiajs/react";
import DeleteDialog from "./delete-dialog";
import { rupiah } from "@/lib/rupiah";

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export const columns = columnHelper.columns([
    columnHelper.accessor("id", {
        id: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: (info) => <p className="text-center">{info.getValue()}</p>,
    }),
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
    // columnHelper.accessor("description", {
    //     header: "Description",
    //     cell: (info) => <p className="max-w-32 truncate">{info.getValue()}</p>,
    // }),
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
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"));
            const formatted = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
            return <p className="text-center">{formatted}</p>;
        },
    }),
    columnHelper.accessor("updated_at", {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Updated At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("updated_at"));
            const formatted = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
            return <p className="text-center">{formatted}</p>;
        },
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const productId = row.original.id;
            const productName = row.original.name;
            return (
                <div
                    className="flex justify-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Link
                        href={editItem(productId).url}
                        className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                        })}
                    >
                        Edit
                    </Link>
                    <DeleteDialog
                        productId={productId}
                        productName={productName}
                    />
                </div>
            );
        },
    }),
]);
