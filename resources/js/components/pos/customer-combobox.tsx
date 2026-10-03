import { Customer } from "@/types/customer";
import { useMemo } from "react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "../ui/combobox";
import { useCartContext } from "./cart-context";

// hardcoded
export const WALK_IN_CUSTOMER: Customer = {
    id: 0,
    name: "Walk-in Customer",
    email: null,
    phone: null,
    address: null,
    city: null,
    postal_code: null,
    is_active: true,
    notes: null,
    created_at: "",
};

interface CustomerComboboxProps {
    customers: Customer[];
}

export default function CustomerCombobox({ customers }: CustomerComboboxProps) {
    const { selectedCustomer, setSelectedCustomer } = useCartContext();

    // prepend hardcoded customer
    const allCustomers = useMemo(
        () => [WALK_IN_CUSTOMER, ...customers],
        [customers],
    );

    const handleValueChange = (customerName: string | null) => {
        if (!customerName || customerName === WALK_IN_CUSTOMER.name) {
            setSelectedCustomer(undefined);
            return;
        }

        const customer = customers.find((c) => c.name === customerName);
        setSelectedCustomer(customer);
    };

    return (
        <Combobox
            items={allCustomers}
            onValueChange={handleValueChange}
            value={selectedCustomer?.name ?? WALK_IN_CUSTOMER.name}
        >
            <ComboboxInput placeholder="Select customer..." />
            <ComboboxContent>
                <ComboboxEmpty>No customers found.</ComboboxEmpty>
                <ComboboxList>
                    {(customer: Customer) => (
                        <ComboboxItem key={customer.id} value={customer.name}>
                            {customer.name}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
