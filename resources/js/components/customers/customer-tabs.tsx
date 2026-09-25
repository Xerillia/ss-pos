import { Customer } from "@/types/customer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomerContact from "./customer-contact";
import CustomerAddress from "./customer-address";
import CustomerNotes from "./customer-notes";

interface CustomerTabsProps {
    customer: Customer;
}

export default function CustomerTabs({ customer }: CustomerTabsProps) {
    return (
        <Tabs defaultValue="information" className="gap-6">
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
            <TabsContent value="order_transaction">2</TabsContent>
        </Tabs>
    );
}
