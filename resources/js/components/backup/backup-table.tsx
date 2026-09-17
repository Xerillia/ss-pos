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

type Backup = {
    name: string;
    size: string;
    date: number;
};

interface BackupTableProps {
    backups: Backup[];
    loading: boolean;
    error: string;
}

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
                    <TableHead>Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Download</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {backups.map((backup: Backup, index) => (
                    <TableRow key={index}>
                        <TableCell>{backup.name}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>{archive(backup.date * 1000)}</TableCell>
                        <TableCell>
                            <Button onClick={() => handleDownload(backup.name)}>
                                <Download />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
