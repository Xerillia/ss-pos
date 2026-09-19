import { columns } from "@/components/customers/columns";
import { DataTable } from "@/components/customers/data-table";
import { Customer } from "@/types/customer";
import { Head } from "@inertiajs/react";

interface CustomersProps {
    customers: Customer[];
}

export default function Customers({ customers }: CustomersProps) {
    return (
        <>
            <Head title="Customers" />
            <div className="m-4">
                <DataTable columns={columns as any} data={customers} />
            </div>
        </>
    );
}

Customers.layout = {
    breadcrumbs: [
        {
            title: "Customers",
        },
    ],
};
