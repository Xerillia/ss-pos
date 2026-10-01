import ItemOverview from "@/components/inventory/items/item-overview";
import ItemSales from "@/components/inventory/items/item-sales";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { inventory } from "@/routes/product";
import { Product } from "@/types/product";
import { Head, useRemember } from "@inertiajs/react";

interface ShowItemProps {
    product: Product;
}

export default function ShowItem({ product }: ShowItemProps) {
    const [activeTab, setActiveTab] = useRemember(
        "overview",
        `item-tab-${product.id}`,
    );

    return (
        <>
            <Head title={product.name} />
            <div className="m-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="sales">Sales</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <ItemOverview product={product} />
                    </TabsContent>
                    <TabsContent value="sales">
                        <ItemSales sale_products={product.sale_products} />
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
