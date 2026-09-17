import { TableCell, TableRow } from "../ui/table";

interface ItemTableRowProps {
    label: string;
    value: number | string;
}

export default function ItemTableRow({ label, value }: ItemTableRowProps) {
    return (
        <TableRow>
            <TableCell className="font-medium bg-accent-foreground/20 dark:bg-accent/40">
                {label}
            </TableCell>
            <TableCell>{value}</TableCell>
        </TableRow>
    );
}
