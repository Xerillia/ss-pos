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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Customer } from "@/types/customer";

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
                        <AvatarFallback>{initials}</AvatarFallback>
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

    columnHelper.accessor("credit_limit", {
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Credit Limit <ArrowUpDown className="ml-2 h-4 w-4" />
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
                            <DropdownMenuItem className="gap-2">
                                <Eye className="h-4 w-4" /> View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <Edit className="h-4 w-4" /> Edit Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <Trash className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    }),
];
