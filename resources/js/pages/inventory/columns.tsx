"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    created_at: string;
    updated_at: string;
};

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
    columnHelper.accessor("description", {
        header: "Description",
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
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
            }).format(amount);
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
]);
