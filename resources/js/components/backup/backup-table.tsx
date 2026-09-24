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
import slugify from "react-slugify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import DeleteBackup from "./delete-backup";

dayjs.extend(utc);

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
    handleApply: (filename: string) => void;
    handleDelete: (filename: string) => void;
}

export default function BackupTable({
    backups,
    loading,
    error,
    handleApply,
    handleDelete,
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
                    <TableHead className="text-center">Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {backups.map((backup: Backup, index) => {
                    const slug = slugify(backup.name);
                    const filename =
                        dayjs(backup.date).utc().format("YYYY-MM-DD-HH-mm-ss") +
                        (slug ? "-" + slug : "") +
                        ".zip";
                    return (
                        <TableRow key={index}>
                            <TableCell>{archive(backup.date)}</TableCell>
                            <TableCell>{backup.name}</TableCell>
                            <TableCell>{backup.size}</TableCell>
                            <TableCell className="text-center">
                                <Button
                                    onClick={() =>
                                        handleDownload(backup.filename)
                                    }
                                >
                                    <Download />
                                </Button>
                            </TableCell>
                            <TableCell className="text-center">
                                <RestoreTo
                                    handleApply={handleApply}
                                    filename={filename}
                                />
                            </TableCell>
                            <TableCell className="text-center">
                                <DeleteBackup
                                    filename={filename}
                                    handleDelete={handleDelete}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
