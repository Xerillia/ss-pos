import ItemAction from "@/components/inventory/item-action";
import ItemTable from "@/components/inventory/item-table";
import { inventory } from "@/routes/product";
import { Product } from "@/types/product";
import { Head } from "@inertiajs/react";

interface ShowItemProps {
    product: Product;
}

export default function ShowItem({ product }: ShowItemProps) {
    return (
        <>
            <Head title={product.name} />
            <div className="m-4 space-y-4">
                <div className="flex justify-between ml-auto w-max">
                    <ItemAction product={product} />
                </div>

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
