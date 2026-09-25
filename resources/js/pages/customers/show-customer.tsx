import CustomerTabs from "@/components/customers/customer-tabs";
import { Button } from "@/components/ui/button";
import { customers } from "@/routes/customer";
import { Customer } from "@/types/customer";
import { Head, router } from "@inertiajs/react";
import { Undo2 } from "lucide-react";
import { useState } from "react";

interface ShowCustomerProps {
    customer: Customer;
}

export default function ShowCustomer({ customer }: ShowCustomerProps) {
    const [activeTab, setActiveTab] = useState("info");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleCancel = () => {
        if (window.history.length <= 2) {
            router.visit(customers());
        } else {
            window.history.back();
        }
    };
    return (
        <>
            <Head title={`Customer ${customer.name}`} />
            <div className="m-4 space-y-4">
                <Button variant="destructive" size="sm" onClick={handleCancel}>
                    <Undo2 /> Return
                </Button>

                <CustomerTabs customer={customer} />
            </div>
        </>
    );
}

ShowCustomer.layout = (page: any) => {
    return {
        breadcrumbs: [
            {
                title: "Customers",
                href: customers(),
            },
            {
                title: page.customer.name,
            },
        ],
    };
};
