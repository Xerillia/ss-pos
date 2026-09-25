import CustomerStats from "@/components/customers/customer-stats";
import CustomerTabs from "@/components/customers/customer-tabs";
import { Button } from "@/components/ui/button";
import { customers, editCustomer } from "@/routes/customer";
import { Customer } from "@/types/customer";
import { Sale } from "@/types/sale";
import { Head, router } from "@inertiajs/react";
import { Edit, Undo2 } from "lucide-react";
import { useState } from "react";

interface ShowCustomerProps {
    customer: Customer;
    sales: {
        data: Sale[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function ShowCustomer({ customer, sales }: ShowCustomerProps) {
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
                <div className="flex justify-between items-center">
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleCancel}
                    >
                        <Undo2 /> Return
                    </Button>

                    <div>
                        <Button
                            size="sm"
                            onClick={() => router.visit(editCustomer(customer))}
                        >
                            <Edit /> Edit Customer
                        </Button>
                    </div>
                </div>

                <CustomerStats customer={customer} />

                <CustomerTabs customer={customer} sales={sales.data} />
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
