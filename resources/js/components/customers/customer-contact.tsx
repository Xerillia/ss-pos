import { Customer } from "@/types/customer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CustomerField from "./customer-field";
import { ymd } from "@/lib/archive";
import { Separator } from "../ui/separator";
import { ShieldCheck } from "lucide-react";

interface CustomerContactProps {
    customer: Customer;
}

export default function CustomerContact({ customer }: CustomerContactProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex gap-2 items-center">
                    <ShieldCheck data-icon="inline-start" size="1rem" /> Contact
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="mt-3">
                <div className="grid grid-cols-2 gap-8">
                    <CustomerField label="Full Name" value={customer.name} />
                    <CustomerField
                        label="Email"
                        value={customer.email}
                        copyable={true}
                    />
                    <CustomerField
                        label="Phone Number"
                        value={customer.phone}
                        copyable={true}
                    />
                    <CustomerField
                        label="Created At"
                        value={ymd(customer.created_at)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
