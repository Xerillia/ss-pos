import { DatabaseArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";

interface BackupNowProps {
    handleBackup: () => void;
    loading: boolean;
    isBackingUp: boolean;
}

export default function BackupNow({
    handleBackup,
    loading,
    isBackingUp,
}: BackupNowProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
        handleBackup();
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className="select-none"
                    //
                    disabled={loading || isBackingUp}
                >
                    <DatabaseArrowDown /> Backup Now
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Backup Database</DialogTitle>
                    <DialogDescription>
                        Click backup to continue.
                    </DialogDescription>
                </DialogHeader>
                <Field>
                    <Input id="name" placeholder="(Optional) Enter a name" />
                </Field>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={handleConfirm}
                        disabled={loading || isBackingUp}
                    >
                        Backup
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
