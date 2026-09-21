import { Product } from "@/types/product";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { rupiah } from "@/lib/rupiah";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface ItemListProps {
    products: Product[];
}

export default function ItemList({ products }: ItemListProps) {
    const stockLabel = (quantity: number) => {
        const style =
            quantity > 10
                ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                : quantity > 0
                  ? "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                  : "border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300";

        const text = quantity > 0 ? `${quantity} Left` : "Out of Stock";

        return <Badge className={style}>{text}</Badge>;
    };

    return (
        <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
                <Card
                    key={product.id}
                    className="group hover:bg-black/5 hover:dark:bg-white/5 hover:cursor-pointer transition-colors"
                >
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400">
                                    {product.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {product.sku || "-"}
                                </p>
                            </div>
                            {stockLabel(product.quantity)}
                        </div>
                        <Separator />
                        <div className="flex justify-between items-end">
                            <p className="font-bold text-sm">
                                {rupiah(product.price)}
                            </p>
                            <Button className="w-6 h-6 group-hover:bg-amber-600 dark:group-hover:bg-amber-400">
                                <Plus />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
