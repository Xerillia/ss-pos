import { Dispatch, SetStateAction } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface DeleteDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    id: number;
    handleDelete: (id: number) => void;
}

export default function DeleteDialog({
    open,
    setOpen,
    title,
    id,
    handleDelete,
}: DeleteDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {" "}
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete <span className="font-semibold">{title}</span>{" "}
                        from the server. Please confirm that you want to
                        proceed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="default">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            onClick={() => handleDelete(id)}
                        >
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
