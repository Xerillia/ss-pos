import { ymd } from "@/lib/archive";
import { Customer } from "@/types/customer";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import CustomerField from "./customer-field";
import { Separator } from "../ui/separator";
import { MapPin } from "lucide-react";

interface CustomerAddressProps {
    customer: Customer;
}

export default function CustomerAddress({ customer }: CustomerAddressProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex gap-2 items-center">
                    <MapPin data-icon="inline-start" size="1rem" /> Address
                    Details
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="mt-3">
                <div className="grid grid-cols-3 gap-8">
                    <CustomerField
                        label="Street Address"
                        value={customer.address}
                        copyable={true}
                    />
                    <CustomerField label="City" value={customer.city} />
                    <CustomerField
                        label="Postal Code"
                        value={customer.postal_code}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
