import { columns } from "@/components/customers/columns";
import { DataTable } from "@/components/customers/data-table";
import { buttonVariants } from "@/components/ui/button";
import { createCustomer } from "@/routes/customer";
import { Customer } from "@/types/customer";
import { Head, Link } from "@inertiajs/react";
import { User } from "lucide-react";

interface CustomersProps {
    customers: Customer[];
}

export default function Customers({ customers }: CustomersProps) {
    return (
        <>
            <Head title="Customers" />
            <div className="m-4 space-y-4">
                <Link
                    as="button"
                    href={createCustomer()}
                    className={buttonVariants({ size: "sm" })}
                >
                    <User data-icon="inline-start" />
                    Add Customer
                </Link>

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
