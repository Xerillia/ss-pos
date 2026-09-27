import { TableCell, TableRow } from "./ui/table";

interface KeyValueRowProps {
    label: string;
    value: number | string;
}

export default function KeyValueRow({ label, value }: KeyValueRowProps) {
    return (
        <TableRow>
            <TableCell className="font-medium bg-accent-foreground/20 dark:bg-accent/40">
                {label}
            </TableCell>
            <TableCell>{value}</TableCell>
        </TableRow>
    );
}
