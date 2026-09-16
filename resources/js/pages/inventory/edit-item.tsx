import { editItem, inventory } from "@/routes/product";
import { Head, Link } from "@inertiajs/react";
import { Undo2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import ItemForm from "./item-form";
import { Product } from "@/types/product";

interface EditItemProps {
    product: Product;
}

export default function EditItem({ product }: EditItemProps) {
    return (
        <>
            <Head title="Edit Item" />
            <div className="m-4">
                <Link
                    as="button"
                    href={inventory()}
                    className={buttonVariants({
                        variant: "destructive",
                        size: "sm",
                    })}
                >
                    <Undo2 /> Cancel
                </Link>

                <ItemForm product={product} mode="edit" />
            </div>
        </>
    );
}

EditItem.layout = {
    breadcrumbs: [
        {
            title: "Inventory",
            href: inventory(),
        },
        {
            title: "Edit Item",
        },
    ],
};
