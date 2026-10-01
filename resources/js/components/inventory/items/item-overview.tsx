import { Product } from "@/types/product";
import ItemAction from "../item-action";
import ItemTable from "../item-table";

interface ItemOverviewProps {
    product: Product;
}

export default function ItemOverview({ product }: ItemOverviewProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between ml-auto w-max">
                <ItemAction product={product} />
            </div>

            <ItemTable product={product} />
        </div>
    );
}
