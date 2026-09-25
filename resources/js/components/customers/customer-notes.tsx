import { Customer } from "@/types/customer";
import { FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

interface CustomerNotesProps {
    customer: Customer;
}

export default function CustomerNotes({ customer }: CustomerNotesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex gap-2 items-center">
                    <FileText data-icon="inline-start" size="1rem" /> Notes
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="mt-3">
                <Textarea
                    value={customer.notes || "No notes yet."}
                    className="resize-none"
                    disabled
                />
            </CardContent>
        </Card>
    );
}
