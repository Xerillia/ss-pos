import { Product } from "@/types/product";
import Fuse from "fuse.js";
import { useMemo } from "react";

export default function useFuse(products: Product[]) {
    const fuse = useMemo(() => {
        return new Fuse(products, {
            keys: ["name", "sku"],
            threshold: 0.3,
        });
    }, [products]);

    const filteredProducts = (query: string) => {
        if (!query.trim()) return products;

        return fuse.search(query).map((result) => result.item);
    };

    return {
        filteredProducts,
    };
}
