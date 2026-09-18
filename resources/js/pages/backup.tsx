import BackupNow from "@/components/backup/backup-now";
import BackupTable from "@/components/backup/backup-table";
import BackupUpload from "@/components/backup/backup-upload";
import { useBackup } from "@/components/backup/useBackup";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Backup() {
    const {
        backups,
        loading,
        error,
        isBackingUp,
        fetchBackups,
        handleBackup,
        isRestoring,
        handleUploadAndApply,
    } = useBackup();

    useEffect(() => {
        fetchBackups();
    }, []);

    return (
        <>
            <Head title="Backup" />
            <div className="m-4 space-y-4">
                <div className="flex gap-3">
                    <BackupNow
                        handleBackup={handleBackup}
                        loading={loading}
                        isBackingUp={isBackingUp}
                    />
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
