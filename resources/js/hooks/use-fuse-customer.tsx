import { Customer } from "@/types/customer";
import Fuse from "fuse.js";
import { useMemo } from "react";

export default function useFuseCustomer(customers: Customer[]) {
    const fuse = useMemo(() => {
        return new Fuse(customers, {
            keys: ["name", "email", "phone", "address", "city", "postal_code"],
            threshold: 0.3,
        });
    }, [customers]);

    const filteredCustomers = (query: string) => {
        if (!query.trim()) return customers;

        return fuse.search(query).map((result) => result.item);
    };

    return {
        filteredProducts: filteredCustomers,
    };
}
