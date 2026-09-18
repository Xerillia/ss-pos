import BackupTable from "@/components/backup/backup-table";
import BackupUpload from "@/components/backup/backup-upload";
import { useBackup } from "@/components/backup/useBackup";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import { DatabaseArrowDown } from "lucide-react";
import { useEffect } from "react";

export default function Backup() {
    const {
        backups,
        loading,
        setLoading,
        error,
        isBackingUp,
        fetchBackups,
        handleBackup,
        isRestoring,
        handleUploadAndApply,
    } = useBackup();

    useEffect(() => {
        setLoading(true);
        fetchBackups();
    }, []);

    return (
        <>
            <Head title="Backup" />
            <div className="m-4 space-y-4">
                <div className="flex gap-3">
                    <Button
                        size="sm"
                        className="select-none"
                        onClick={handleBackup}
                        disabled={loading || isBackingUp}
                    >
                        <DatabaseArrowDown /> Backup Now
                    </Button>
                    <BackupUpload
                        isBackingUp={isBackingUp}
                        isRestoring={isRestoring}
                        loading={loading}
                        handleUploadAndApply={handleUploadAndApply}
                    />
                </div>
                <div className="w-1/2">
                    <BackupTable
                        backups={backups}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
        </>
    );
}

Backup.layout = {
    breadcrumbs: [
        {
            title: "Backup",
        },
    ],
};
