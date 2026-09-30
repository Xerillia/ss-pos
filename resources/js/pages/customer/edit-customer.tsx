import CustomerForm from "@/components/customers/customer-form";
import { customers } from "@/routes/customer";
import { Customer } from "@/types/customer";
import { Head } from "@inertiajs/react";

interface EditCustomerProps {
    customer: Customer;
}

export default function EditCustomer({ customer }: EditCustomerProps) {
    return (
        <>
            <Head title="Add Customer" />
            <div className="m-4 space-y-4">
                <CustomerForm mode="edit" customer={customer} />
            </div>
        </>
    );
}

EditCustomer.layout = (page: any) => {
    return {
        breadcrumbs: [
            {
                title: "Customers",
                href: customers(),
            },
            {
                title: `${page.customer.name} (editing)`,
            },
        ],
    };
};
