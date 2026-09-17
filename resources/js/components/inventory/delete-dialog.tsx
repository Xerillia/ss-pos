import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { destroyItem } from "@/routes/product";
import { useForm } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteDialogProps {
    productId: number;
    productName: string;
}

export default function DeleteDialog({
    productId,
    productName,
}: DeleteDialogProps) {
    const [open, setOpen] = useState(false);

    const { delete: destroy, processing } = useForm();

    const handleDelete = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        destroy(destroyItem(productId).url, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className={buttonVariants({
                    variant: "destructive",
                    size: "sm",
                })}
            >
                <Trash2 /> Delete
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete{" "}
                        <span className="font-semibold">{productName}</span>{" "}
                        from the server. Please confirm that you want to
                        proceed.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <form onSubmit={handleDelete}>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={processing}
                        >
                            {processing ? "Deleting..." : "Delete"}
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
