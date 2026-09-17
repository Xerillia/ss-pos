import ItemTable from "@/components/inventory/item-table";
import { buttonVariants } from "@/components/ui/button";
import { inventory } from "@/routes/product";
import { Product } from "@/types/product";
import { Head, Link } from "@inertiajs/react";
import { Undo2 } from "lucide-react";

interface ShowItemProps {
    product: Product;
}

export default function ShowItem({ product }: ShowItemProps) {
    return (
        <>
            <Head title={product.name} />
            <div className="m-4 space-y-4">
                <Link
                    href={inventory()}
                    className={buttonVariants({ size: "sm" })}
                >
                    <Undo2 /> Return
                </Link>

                <ItemTable product={product} />
            </div>
        </>
    );
}

ShowItem.layout = (page: any) => {
    return {
        breadcrumbs: [
            {
                title: "Inventory",
                href: inventory(),
            },
            {
                title: page.product.name,
            },
        ],
    };
};
