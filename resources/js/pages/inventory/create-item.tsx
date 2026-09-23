import { createItem, inventory } from "@/routes/product";
import ItemForm from "../../components/inventory/item-form";
import { Head, router } from "@inertiajs/react";
import { Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateItem() {
    const handleCancel = () => {
        if (window.history.length <= 2) {
            router.visit(inventory());
        } else {
            window.history.back();
        }
    };

    return (
        <>
            <Head title="Add Item" />
            <div className="m-4">
                <Button variant="destructive" size="sm" onClick={handleCancel}>
                    <Undo2 /> Cancel
                </Button>

                <ItemForm mode="create" />
            </div>
        </>
    );
}

CreateItem.layout = {
    breadcrumbs: [
        {
            title: "Inventory",
            href: inventory(),
        },
        {
            title: "Add Item",
            href: createItem(),
        },
    ],
};
