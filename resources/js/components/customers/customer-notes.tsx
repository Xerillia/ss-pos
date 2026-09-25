import { Customer } from "@/types/customer";
import { FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { updateCustomer } from "@/routes/customer";
import { toast } from "sonner";

interface CustomerNotesProps {
    customer: Customer;
}

export default function CustomerNotes({ customer }: CustomerNotesProps) {
    const [isEditing, setEditing] = useState(false);
    const [notes, setNotes] = useState(customer.notes ?? "");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSave = () => {
        const trimmedNotes = notes.trim();
        const currentServerNotes = customer.notes ?? "";

        // No changes made
        if (trimmedNotes === currentServerNotes) {
            setEditing(false);
            return;
        }

        const toastId = toast.loading("Saving notes...");

        router.put(
            updateCustomer(customer),
            {
                notes: trimmedNotes === "" ? null : trimmedNotes,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Notes saved!", { id: toastId });
                    setEditing(false);
                },
                onError: (err) => {
                    toast.error(err.message || "Failed to save!", {
                        id: toastId,
                    });
                },
            },
        );
    };

    const handleEditToggle = () => {
        if (!isEditing) {
            setEditing(true);
            setTimeout(() => textareaRef.current?.focus(), 0);
        } else {
            handleSave();
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex gap-2 items-center">
                    <FileText data-icon="inline-start" size="1rem" /> Notes
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="mt-3 space-y-4">
                <Textarea
                    ref={textareaRef}
                    value={isEditing ? notes : notes || "No notes yet."}
                    onChange={(e) => setNotes(e.target.value)}
                    className="resize-none"
                    disabled={!isEditing}
                />
                <Separator />

                <Button className="w-full" size="sm" onClick={handleEditToggle}>
                    {isEditing ? "Save" : "Edit"} Notes
                </Button>
            </CardContent>
        </Card>
    );
}
