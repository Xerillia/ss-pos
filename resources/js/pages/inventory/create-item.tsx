import { createItem, inventory } from "@/routes/product";
import CreateItemForm from "./create-item-form";
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

                <CreateItemForm />
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
