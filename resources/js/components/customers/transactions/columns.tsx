"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { SaleStatus, SaleStatusUtils } from "@/enums";
import { ymd } from "@/lib/archive";
import { DataTableFeatures } from "@/lib/data-table-features";
import { rupiah } from "@/lib/rupiah";
import { styleVariants } from "@/lib/style";
import { showSale } from "@/routes/sales";
import { Sale } from "@/types/sale";
import { Link } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";
import { VariantProps } from "class-variance-authority";

const columnHelper = createColumnHelper<DataTableFeatures, Sale>();

const statusVariantMap: Record<
    SaleStatus,
    VariantProps<typeof styleVariants>["variant"]
> = {
    [SaleStatus.COMPLETED]: "green",
    [SaleStatus.PENDING]: "yellow",
    [SaleStatus.REFUNDED]: "red",
};

export const columns = columnHelper.columns([
    columnHelper.accessor("sale_number", {
        header: "Sale Number",
    }),

    columnHelper.accessor("created_at", {
        header: "Date",
        cell: (info) => ymd(info.getValue()),
    }),

    columnHelper.accessor("unique_products_count", {
        header: "Unique Items",
        cell: (info) =>
            `${info.getValue() || 0} item${(info.getValue() || 0) !== 1 ? "s" : ""}`,
    }),

    columnHelper.accessor("total_amount", {
        header: "Total",
        cell: (info) => rupiah(info.getValue()),
    }),

    columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
            const variant = statusVariantMap[info.getValue()] ?? "red";
            const className = styleVariants({ variant });
            return (
                <Badge className={className}>
                    {SaleStatusUtils.label(info.getValue())}
                </Badge>
            );
        },
    }),

    columnHelper.display({
        header: "Actions",
        cell: ({ row }) => {
            const id = row.original.id;

            return (
                <Link
                    href={showSale(id)}
                    className={buttonVariants({
                        variant: "secondary",
                        size: "xs",
                    })}
                >
                    View Details
                </Link>
            );
        },
    }),
]);
