import { Customer } from "@/types/customer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomerContact from "./customer-contact";
import CustomerAddress from "./customer-address";
import CustomerNotes from "./customer-notes";
import CustomerTransactions from "./customer-transactions";
import { Sale } from "@/types/sale";
import { useRemember } from "@inertiajs/react";

interface CustomerTabsProps {
    customer: Customer;
    sales: Sale[];
}

export default function CustomerTabs({ customer, sales }: CustomerTabsProps) {
    const [activeTab, setActiveTab] = useRemember(
        "information",
        `customer-tab-${customer.id}`,
    );

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-6">
            <TabsList>
                <TabsTrigger value="information">
                    Customer Information
                </TabsTrigger>
                <TabsTrigger value="order_transaction">
                    Orders & Transactions
                </TabsTrigger>
            </TabsList>
            <TabsContent value="information" className="flex flex-col gap-4">
                <CustomerContact customer={customer} />
                <CustomerAddress customer={customer} />
                <CustomerNotes customer={customer} />
            </TabsContent>
            <TabsContent value="order_transaction">
                <CustomerTransactions sales={sales} />
            </TabsContent>
        </Tabs>
    );
}
