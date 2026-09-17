import BackupHistory from "@/components/backup/backup-history";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import { DatabaseArrowDown } from "lucide-react";

export default function Backup() {
    return (
        <>
            <Head title="Backup" />
            <div className="m-4 space-y-4">
                <Button size="sm" className="select-none">
                    <DatabaseArrowDown /> Backup Now
                </Button>
                <BackupHistory />
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
