import { buttonVariants } from "@/components/ui/button";
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
import { Link } from "@inertiajs/react";

interface DeleteDialogProps {
    productId: number;
    productName: string;
}

export default function DeleteDialog({
    productId,
    productName,
}: DeleteDialogProps) {
    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    variant: "destructive",
                    size: "sm",
                })}
            >
                Delete
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
                    <Link
                        href={destroyItem(productId).url}
                        className={buttonVariants({
                            variant: "destructive",
                        })}
                        method="delete"
                    >
                        Confirm Delete
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
