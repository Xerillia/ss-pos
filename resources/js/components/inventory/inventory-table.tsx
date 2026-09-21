import { Product } from "@/types/product";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/lib/useDebounce";
import useFuse from "../pos/useFuse";
import { Search } from "lucide-react";

interface InventoryTableProps {
    products: Product[];
}

export default function InventoryTable({ products }: InventoryTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const { filteredProducts } = useFuse(products);

    const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms debounce

    const filtered = useMemo<Product[]>(() => {
        return filteredProducts(debouncedSearchQuery);
    }, [debouncedSearchQuery, products]);

    const hasSearch = debouncedSearchQuery.trim().length > 0;

    return (
        <>
            <div className="transition-transform">
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        id="query"
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
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
                            {filtered.length} out of {products.length} items
                            found
                        </Label>
                    </div>
                </div>
            </div>

            <div>
                <div
                    className={`grid transition-all duration-300 ease-in-out ${
                        filtered.length > 0
                            ? "grid-rows-[1fr] opacity-100 mb-2"
                            : "grid-rows-[0fr] opacity-0 mb-0"
                    }`}
                >
                    <Label className="text-muted-foreground block">
                        Click on any row to open the specified item.
                    </Label>
                </div>
                <DataTable columns={columns} data={filtered} />
            </div>
        </>
    );
}
