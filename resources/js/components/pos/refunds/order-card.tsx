import ShowSaleTable from "@/components/sales/show-sale-table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { archive } from "@/lib/archive";
import { Sale } from "@/types/sale";
import OrderTable from "./order-table";
import { WALK_IN_CUSTOMER } from "../customer-combobox";

interface OrderCardProps {
    sales: Sale[];
}

export default function OrderCard({ sales }: OrderCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                    Select orders for items to refund
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple">
                    {sales.map((sale) => {
                        return (
                            <AccordionItem key={sale.id} value={`${sale.id}`}>
                                <AccordionTrigger>
                                    {`${archive(sale.sale_date)} | ${sale.customer?.name || WALK_IN_CUSTOMER.name} | ${sale.sale_number}`}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <OrderTable sale={sale} />
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </CardContent>
        </Card>
    );
}
