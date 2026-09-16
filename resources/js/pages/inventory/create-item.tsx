import { createItem, inventory } from "@/routes/product";
import ItemForm from "./item-form";
import { Head, Link } from "@inertiajs/react";
import { Undo2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function CreateItem() {
    return (
        <>
            <Head title="Add Item" />
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
