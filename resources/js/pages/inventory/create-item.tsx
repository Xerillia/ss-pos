import { createItem, inventory } from "@/routes/product";

export default function CreateItem() {
    return <></>;
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
