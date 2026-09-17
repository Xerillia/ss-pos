import { inventory } from "@/routes/product";
import { Head, router } from "@inertiajs/react";
import { Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ItemForm from "../../components/inventory/item-form";
import { Product } from "@/types/product";

interface EditItemProps {
    product: Product;
}

export default function EditItem({ product }: EditItemProps) {
    const handleCancel = () => {
        if (window.history.length <= 2) {
            router.visit(inventory());
        } else {
            window.history.back();
        }
    };
    return (
        <>
            <Head title="Edit Item" />
            <div className="m-4">
                <Button variant="destructive" size="sm" onClick={handleCancel}>
                    <Undo2 /> Cancel
                </Button>

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
