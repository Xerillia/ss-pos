import ItemOverview from "@/components/inventory/item-overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { inventory } from "@/routes/product";
import { Product } from "@/types/product";
import { Head } from "@inertiajs/react";

interface ShowItemProps {
    product: Product;
}

export default function ShowItem({ product }: ShowItemProps) {
    return (
        <>
            <Head title={product.name} />
            <div className="m-4">
                <Tabs defaultValue="overview">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="sales">Sales</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <ItemOverview product={product} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

ShowItem.layout = (page: any) => {
    return {
        breadcrumbs: [
            {
                title: "Inventory",
                href: inventory(),
            },
            {
                title: page.product.name,
            },
        ],
    };
};
