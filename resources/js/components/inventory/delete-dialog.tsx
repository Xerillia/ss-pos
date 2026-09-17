import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteDialogContent from "./delete-dialog-content";

interface DeleteDialogProps {
    product: Product;
}

export default function DeleteDialog({ product }: DeleteDialogProps) {
    const [open, setOpen] = useState(false);

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
                <DeleteDialogContent product={product} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}
