import { DatabaseArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "../ui/alert-dialog";

interface RestoreToProps {
    handleApply: (filename: string) => void;
    filename: string;
}

export default function RestoreTo({ handleApply, filename }: RestoreToProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirmRestore = () => {
        handleApply(filename);

        setIsOpen(false);
    };

    const handleCancelRestore = () => {
        setIsOpen(false);
    };

    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">
                        <DatabaseArrowUp />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        Are you absolutely sure?
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        This action is destructive. Proceeding will completely
                        overwrite your current database tables with the contents
                        of{" "}
                        <span className="font-semibold text-destructive break-all">
                            {filename}
                        </span>
                        . Any unsaved data currently in the database will be
                        permanently lost.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <Button size="sm" onClick={handleCancelRestore}>
                            Cancel
                        </Button>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleConfirmRestore}
                        >
                            Overwrite
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
