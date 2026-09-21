import CustomerForm from "@/components/customers/customer-form";
import { Button } from "@/components/ui/button";
import { customers } from "@/routes/customer";
import { Customer } from "@/types/customer";
import { Head, router } from "@inertiajs/react";
import { Undo2 } from "lucide-react";

interface EditCustomerProps {
    customer: Customer;
}

export default function EditCustomer({ customer }: EditCustomerProps) {
    const handleCancel = () => {
        if (window.history.length <= 2) {
            router.visit(customers());
        } else {
            window.history.back();
        }
    };
    return (
        <>
            <Head title="Add Customer" />
            <div className="m-4 space-y-4">
                <Button variant="destructive" size="sm" onClick={handleCancel}>
                    <Undo2 /> Cancel
                </Button>

                <CustomerForm mode="edit" customer={customer} />
            </div>
        </>
    );
}
