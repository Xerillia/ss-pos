import { PaymentMethodUtils, SaleStatusUtils } from "@/enums";
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
import { Link } from "@inertiajs/react";
import { showSale } from "@/routes/sales";
import { Sale } from "@/types/sale";

const columnHelper = createColumnHelper<DataTableFeatures, Sale>();

export const columns = [
    // Selection Column
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }),

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
    columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
            const status = info.getValue();
            return (
                <Badge
                    variant={status === "completed" ? "default" : "destructive"}
                >
                    {SaleStatusUtils.label(status)}
                </Badge>
            );
        },
    }),

    // Actions Column
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const sale = row.original;

            return (
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
                            // onClick={() => handleDelete(sale.id)}
                            className="text-red-600 cursor-pointer flex items-center"
                        >
                            <Trash className="mr-2 h-4 w-4" /> Delete Sale
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }),
];
