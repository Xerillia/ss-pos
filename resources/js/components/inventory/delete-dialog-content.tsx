import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { destroyItem } from "@/routes/product";
import { Product } from "@/types/product";
import { useForm } from "@inertiajs/react";
import { Button } from "../ui/button";

interface DeleteDialogContentProps {
    product: Product;
    setOpen: (state: boolean) => void;
}

export default function DeleteDialogContent({
    product,
    setOpen,
}: DeleteDialogContentProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        destroy(destroyItem(product).url, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete{" "}
                    <span className="font-semibold">{product.name}</span> from
                    the server. Please confirm that you want to proceed.
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
        </>
    );
}
