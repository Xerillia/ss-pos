import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import dayjs from "dayjs";

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
        header: "ID",
        cell: (info) => <p className="text-center">{info.getValue()}</p>,
    }),
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
        header: "Price",
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
        header: "Quantity",
        cell: (info) => <p className="text-center">{info.getValue()}</p>,
    }),
    columnHelper.accessor("created_at", {
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"));
            const formatted = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
            return <p className="text-center">{formatted}</p>;
        },
    }),
    columnHelper.accessor("updated_at", {
        header: "Updated At",
        cell: ({ row }) => {
            const date = new Date(row.getValue("updated_at"));
            const formatted = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
            return <p className="text-center">{formatted}</p>;
        },
    }),
]);
