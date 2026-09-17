import { inventory } from "@/routes/product";
import { Product } from "@/types/product";

interface ShowItemProps {
    product: Product;
}

export default function ShowItem({ product }: ShowItemProps) {
    return (
        <>
            <div>hi</div>
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
