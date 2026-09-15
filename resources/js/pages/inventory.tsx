import { Button } from "@/components/ui/button";
import { inventory } from "@/routes";
import { Head } from "@inertiajs/react";
import { PackagePlus } from "lucide-react";

export default function Inventory() {
    return (
        <>
            <Head title="Inventory" />
            <div className="ml-2 mt-2">
                <Button size="sm">
                    <PackagePlus /> Add Item
                </Button>
            </div>
        </>
    );
}

Inventory.layout = {
    breadcrumbs: [
        {
            title: "Inventory",
            href: inventory(),
        },
    ],
};
