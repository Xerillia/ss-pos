import { Product } from "@/types/product";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { rupiah } from "@/lib/rupiah";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import useFuse from "./useFuse";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";
import { useDebounce } from "@/lib/useDebounce";

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

    const [query, setQuery] = useState("");
    const { filteredProducts } = useFuse(products);

    const debouncedSearchQuery = useDebounce(query, 300); // 300ms debounce

    const filtered = useMemo<Product[]>(() => {
        return filteredProducts(debouncedSearchQuery);
    }, [debouncedSearchQuery, products]);

    return (
        <>
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        id="query"
                        type="text"
                        placeholder="Search items..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {filtered.map((product) => {
                        const isDisabled = product.quantity <= 0;

                        return (
                            <Card
                                key={product.id}
                                // {...(!isDisabled && {
                                //     onClick: () => handleSelect(product),
                                // })}
                                className={`group transition-colors ${
                                    isDisabled
                                        ? "opacity-50 cursor-not-allowed select-none"
                                        : "hover:bg-black/5 hover:dark:bg-white/5 hover:cursor-pointer"
                                }`}
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
                                        <Button
                                            disabled={isDisabled}
                                            className="w-6 h-6 group-hover:bg-amber-600 dark:group-hover:bg-amber-400"
                                        >
                                            <Plus />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
