import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { UploadCloud } from "lucide-react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

interface BackupUploadProps {
    loading: boolean;
    isBackingUp: boolean;
    isRestoring: boolean;
    handleUploadAndApply: (file: File | null) => void;
}
export default function BackupUpload({
    loading,
    isBackingUp,
    isRestoring,
    handleUploadAndApply,
}: BackupUploadProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // States to control the dialog overlay and hold the selected file reference
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            // Store file reference and open the modal instead of running immediately
            setSelectedFile(files[0]);
            setIsConfirmOpen(true);

            // Clear input so the same file selection can be picked sequentially later
            event.target.value = "";
        }
    };

    const handleConfirmRestore = (): void => {
        if (selectedFile) {
            handleUploadAndApply(selectedFile);
            setSelectedFile(null);
        }
        setIsConfirmOpen(false);
    };

    const handleCancelRestore = (): void => {
        setSelectedFile(null);
        setIsConfirmOpen(false);
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept=".sql,.zip"
                className="hidden"
            />
            <Button
                size="sm"
                variant="outline"
                className="select-none"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading || isBackingUp || isRestoring}
            >
                <UploadCloud />{" "}
                {isRestoring ? "Applying Database..." : "Upload Backup"}
            </Button>

            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action is destructive. Proceeding will
                            completely overwrite your current database tables
                            with the contents of{" "}
                            <span className="font-semibold text-destructive break-all">
                                {selectedFile?.name}
                            </span>
                            . Any unsaved data currently in the database will be
                            permanently lost.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
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
