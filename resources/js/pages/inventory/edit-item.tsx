import { inventory } from "@/routes/product";
import { Head } from "@inertiajs/react";
import ItemForm from "../../components/inventory/item-form";
import { Product } from "@/types/product";

interface EditItemProps {
    product: Product;
}

export default function EditItem({ product }: EditItemProps) {
    return (
        <>
            <Head title="Edit Item" />
            <div className="m-4">
                <ItemForm product={product} mode="edit" />
            </div>
        </>
    );
}

EditItem.layout = (page: any) => {
    return {
        breadcrumbs: [
            {
                title: "Inventory",
                href: inventory(),
            },
            {
                title: `${page.product.name} (editing)`,
            },
        ],
    };
};
