import { createItem, inventory } from "@/routes/product";
import ItemForm from "../../components/inventory/item-form";
import { Head } from "@inertiajs/react";

export default function CreateItem() {
    return (
        <>
            <Head title="Add Item" />
            <div className="m-4">
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
