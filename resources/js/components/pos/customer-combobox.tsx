import { Customer } from "@/types/customer";
import { useMemo, useState } from "react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "../ui/combobox";

// hardcoded
export const WALK_IN_CUSTOMER: Customer = {
    id: 0,
    name: "Walk-in Customer",
    email: null,
    phone: null,
    address: null,
    city: null,
    postal_code: null,
    credit_limit: 0,
    total_spent: 0,
    is_active: true,
    notes: null,
    created_at: "",
};

interface CustomerComboboxProps {
    customers: Customer[];
    onSelect?: (customer: Customer | null) => void;
}

export default function CustomerCombobox({
    customers,
    onSelect,
}: CustomerComboboxProps) {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
        WALK_IN_CUSTOMER,
    );

    const allCustomers = useMemo(
        () => [WALK_IN_CUSTOMER, ...customers],
        [customers],
    );

    const handleValueChange = (customer: Customer | null) => {
        setSelectedCustomer(customer);
        onSelect?.(customer);
    };

    return (
        <Combobox
            items={allCustomers}
            value={selectedCustomer}
            onValueChange={handleValueChange}
            itemToStringValue={(customer: Customer | null) =>
                customer?.name ?? ""
            }
        >
            <ComboboxInput
                placeholder="Select customer..."
                value={selectedCustomer?.name ?? ""}
            />
            <ComboboxContent>
                <ComboboxEmpty>No customers found.</ComboboxEmpty>
                <ComboboxList>
                    {(customer: Customer) => (
                        <ComboboxItem key={customer.id} value={customer}>
                            {customer.name}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
