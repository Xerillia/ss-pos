import CustomerForm from "@/components/customers/customer-form";
import { customers } from "@/routes/customer";
import { Head } from "@inertiajs/react";

export default function CreateCustomer() {
    return (
        <>
            <Head title="Add Customer" />
            <div className="m-4 space-y-4">
                <CustomerForm mode="create" />
            </div>
        </>
    );
}

CreateCustomer.layout = {
    breadcrumbs: [
        {
            title: "Customers",
            href: customers(),
        },
        {
            title: "Add Customer",
        },
    ],
};
