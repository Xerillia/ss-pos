import api from "@/api/axios";
import BackupHistory from "@/components/backup/backup-history";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import { DatabaseArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Backup() {
    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const fetchBackups = async () => {
        try {
            const response = await api.get("backups");
            setBackups(response.data);
            setError("");
        } catch (err: any) {
            setError(err.message || "Failed to load backups.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchBackups();
    }, []);

    const [isBackingUp, setIsBackingUp] = useState(false);
    const handleBackup = async () => {
        setIsBackingUp(true);

        try {
            const response = await api.post("/backups");

            if (response.data.success) {
                toast.success(response.data.message);

                await fetchBackups();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsBackingUp(false);
        }
    };

    return (
        <>
            <Head title="Backup" />
            <div className="m-4 space-y-4">
                <Button
                    size="sm"
                    className="select-none"
                    onClick={handleBackup}
                    disabled={isBackingUp}
                >
                    <DatabaseArrowDown /> Backup Now
                </Button>
                <BackupHistory
                    backups={backups}
                    loading={loading}
                    error={error}
                />
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
