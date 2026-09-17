import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { archive } from "@/lib/archive";
import api from "@/api/axios";

type Backup = {
    name: string;
    size: string;
    date: number;
};

interface BackupHistoryProps {
    backups: Backup[];
    loading: boolean;
    error: string;
}

export default function BackupHistory({
    backups,
    loading,
    error,
}: BackupHistoryProps) {
    if (loading) return <div>Loading backups...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {backups.map((backup: Backup, index) => (
                    <TableRow key={index}>
                        <TableCell>{backup.name}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>{archive(backup.date * 1000)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
