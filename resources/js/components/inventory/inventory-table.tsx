import { Product } from "@/types/product";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/lib/useDebounce";

interface InventoryTableProps {
    products: Product[];
}

export default function InventoryTable({ products }: InventoryTableProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms debounce

    const fuse = useMemo(() => {
        return new Fuse(products, {
            keys: ["name", "description"],
            threshold: 0.3,
        });
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (!debouncedSearchQuery.trim()) {
            return products;
        }
        return fuse.search(debouncedSearchQuery).map((result) => result.item);
    }, [debouncedSearchQuery, fuse, products]);

    const hasSearch = debouncedSearchQuery.trim().length > 0;

    return (
        <>
            <div className="transition-transform">
                <Input
                    id="search"
                    placeholder="Search item..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-1/2"
                />
                <div
                    className={`grid transition-all duration-300 ease-in-out ${
                        hasSearch
                            ? "grid-rows-[1fr] opacity-100 mt-2"
                            : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                >
                    <div className="overflow-hidden">
                        <Label
                            htmlFor="search"
                            className="text-muted-foreground block"
                        >
                            {filteredProducts.length} out of {products.length}{" "}
                            items found
                        </Label>
                    </div>
                </div>
            </div>

            <div>
                <div
                    className={`grid transition-all duration-300 ease-in-out ${
                        filteredProducts.length > 0
                            ? "grid-rows-[1fr] opacity-100 mb-2"
                            : "grid-rows-[0fr] opacity-0 mb-0"
                    }`}
                >
                    <Label className="text-muted-foreground block">
                        Click on any row to open the specified item.
                    </Label>
                </div>
                <DataTable columns={columns} data={filteredProducts} />
            </div>
        </>
    );
}
