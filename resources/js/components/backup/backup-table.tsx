import { Download } from "lucide-react";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { archive } from "@/lib/archive";
import { useBackup } from "./useBackup";
import RestoreTo from "./restore-to";

type Backup = {
    filename: string;
    name: string;
    size: string;
    date: number;
};

interface BackupTableProps {
    backups: Backup[];
    loading: boolean;
    error: string;
}

const SECOND_TO_MILLISECOND = 1000;

export default function BackupTable({
    backups,
    loading,
    error,
}: BackupTableProps) {
    if (loading) return <div>Loading backups...</div>;
    if (error) return <div>Error: {error}</div>;

    const { handleDownload } = useBackup();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-center">Download</TableHead>
                    <TableHead className="text-center">Restore</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {backups.map((backup: Backup, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            {archive(backup.date * SECOND_TO_MILLISECOND)}
                        </TableCell>
                        <TableCell>{backup.name}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell className="text-center">
                            <Button
                                onClick={() => handleDownload(backup.filename)}
                            >
                                <Download />
                            </Button>
                        </TableCell>
                        <TableCell className="text-center">
                            <RestoreTo />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
