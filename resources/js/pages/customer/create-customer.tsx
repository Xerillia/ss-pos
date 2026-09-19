import { buttonVariants } from "@/components/ui/button";
import { customers } from "@/routes/customer";
import { Head, Link } from "@inertiajs/react";
import { Undo2 } from "lucide-react";

export default function CreateCustomer() {
    return (
        <>
            <Head title="Add Customer" />
            <div className="m-4">
                <Link
                    as="button"
                    href={customers()}
                    className={buttonVariants({
                        variant: "destructive",
                        size: "sm",
                    })}
                >
                    <Undo2 /> Cancel
                </Link>
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
