import { createItem, inventory } from "@/routes/product";
import CreateItemForm from "./create-item-form";
import { Link } from "@inertiajs/react";
import { Undo2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function CreateItem() {
    return (
        <div className="m-4">
            <Link
                href={inventory()}
                className={buttonVariants({
                    variant: "destructive",
                    size: "sm",
                })}
            >
                <Undo2 /> Cancel
            </Link>

            <CreateItemForm />
        </div>
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
