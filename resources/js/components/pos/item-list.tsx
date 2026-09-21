import { Product } from "@/types/product";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { rupiah } from "@/lib/rupiah";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import useFuse from "./useFuse";
import { Input } from "../ui/input";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/lib/useDebounce";
import { getPageRange } from "@/lib/pagination";

interface ItemListProps {
    products: Product[];
    addToCart: (product: Product) => void;
}

const ITEMS_PER_PAGE = 8;

export default function ItemList({ products, addToCart }: ItemListProps) {
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

    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 when search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchQuery]);

    // Calculate total pages and page range
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const pageRange = useMemo(
        () => getPageRange(currentPage, totalPages),
        [currentPage, totalPages],
    );

    // Slice products array for current page
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filtered, currentPage]);

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
                <div className="overflow-y-auto">
                    {paginatedProducts.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground">
                            No products found.
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            {paginatedProducts.map((product) => {
                                const isDisabled = product.quantity <= 0;

                                return (
                                    <Card
                                        key={product.id}
                                        {...(!isDisabled && {
                                            onClick: () => addToCart(product),
                                        })}
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
                    )}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="sticky bottom-0 bg-background py-2 border-t flex items-center justify-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>

                        {pageRange.map((page, index) => {
                            if (page === "ellipsis") {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="px-1 text-sm text-muted-foreground select-none"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            return (
                                <Button
                                    key={page}
                                    variant={
                                        currentPage === page
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    className="aspect-square"
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            );
                        })}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages),
                                )
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
