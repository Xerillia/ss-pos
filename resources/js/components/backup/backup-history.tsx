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

type Backup = {
    name: string;
    size: string;
    date: number;
};

export default function BackupHistory() {
    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_APP_URL}/api/backups`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(
                        `${response.status}: ${response.statusText}`,
                    );
                return response.json();
            })
            .then((data) => {
                setBackups(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

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
