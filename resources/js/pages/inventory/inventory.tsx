import { buttonVariants } from "@/components/ui/button";
import { createItem, inventory } from "@/routes/product";
import { Head, Link } from "@inertiajs/react";
import { PackagePlus } from "lucide-react";

export default function Inventory() {
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
