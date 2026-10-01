"use client";

import { archive } from "@/lib/archive";
import { DataTableFeatures } from "@/lib/data-table-features";
import { formatNumber } from "@/lib/number";
import { SaleProduct } from "@/types/sale";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<DataTableFeatures, SaleProduct>();

export const columns = columnHelper.columns([
    columnHelper.accessor("sale.sale_number", {
        header: "Sale Number",
    }),

    columnHelper.accessor("quantity", {
        header: "Quantity",
        cell: (info) => formatNumber(info.getValue()),
    }),

    columnHelper.accessor("product_unit", {
        header: "Unit",
    }),

    columnHelper.accessor("sale.sale_date", {
        header: "Sale Date",
        cell: (info) => archive(info.getValue()),
    }),
]);
