import { buttonVariants } from "@/components/ui/button";
import { createItem, inventory } from "@/routes/product";
import { Head, Link, usePage } from "@inertiajs/react";
import { PackagePlus } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import InventoryTable from "../../components/inventory/inventory-table";
import { Product } from "@/types/product";

interface InventoryProps {
    products: Product[];
}

export default function Inventory({ products }: InventoryProps) {
    const { flash } = usePage().props as any;

    // prevent toast from firing again when returning
    const lastToastRef = useRef<string | null>(null);

    useEffect(() => {
        // do not flash again if toast ref is  the same
        if (
            !lastToastRef &&
            (flash.success === lastToastRef || flash.error === lastToastRef)
        ) {
            return;
        }

        if (flash.success) {
            toast.success(flash.success.message, { id: flash.success.id });
        }

        if (flash.error) {
            toast.error(flash.error.message, { id: flash.error.id });
        }
    }, [flash]);

    return (
        <>
            <Head title="Inventory" />
            <div className="m-4 space-y-4">
                <Link
                    as="button"
                    href={createItem()}
                    className={buttonVariants({ size: "sm" })}
                >
                    <PackagePlus /> Add Item
                </Link>

                <InventoryTable products={products} />
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
