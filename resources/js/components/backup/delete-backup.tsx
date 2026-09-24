import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";

interface DeleteBackupProps {
    filename: string;
    handleDelete: (filename: string) => void;
}

export default function DeleteBackup({
    filename,
    handleDelete,
}: DeleteBackupProps) {
    const [isOpen, setOpen] = useState(false);

    const handleCancel = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        handleDelete(filename);

        setOpen(false);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>Are you absolutely sure?</AlertDialogHeader>
                <AlertDialogDescription>
                    This action is destructive. Proceeding will remove the{" "}
                    <span className="font-semibold text-destructive break-all">
                        {filename}
                    </span>{" "}
                    backup. Any stored data there will be permanently lost.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <Button size="sm" onClick={handleCancel}>
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleConfirm}
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
