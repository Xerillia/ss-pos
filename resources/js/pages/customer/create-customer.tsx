import { customerIndex } from "@/routes/customer";
import { Head } from "@inertiajs/react";

export default function CreateCustomer() {
    return (
        <>
            <Head title="Add Customer" />
            <div className="m-4">
                <p>hi</p>
            </div>
        </>
    );
}

CreateCustomer.layout = {
    breadcrumbs: [
        {
            title: "Customers",
            href: customerIndex(),
        },
        {
            title: "Add Customer",
        },
    ],
};
