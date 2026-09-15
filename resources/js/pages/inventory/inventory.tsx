import { buttonVariants } from "@/components/ui/button";
import { createItem, inventory } from "@/routes/product";
import { Head, Link, usePage } from "@inertiajs/react";
import { PackagePlus } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Inventory() {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, { id: "success-toast" });
        }
        if (flash.error) {
            toast.error(flash.error, { id: "error-toast" });
        }
    }, [flash]);

    return (
        <>
            <Head title="Inventory" />
            <div className="m-4">
                <Link
                    href={createItem()}
                    className={buttonVariants({ size: "sm" })}
                >
                    <PackagePlus /> Add Item
                </Link>
            </div>
        </>
    );
}

Inventory.layout = {
    breadcrumbs: [
        {
            title: "Inventory",
            href: inventory(),
        },
    ],
};
