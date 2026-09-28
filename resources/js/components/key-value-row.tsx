import { ReactNode } from "react";
import { TableCell, TableRow } from "./ui/table";

interface KeyValueRowProps {
    label: string;
    children?: ReactNode;
}

export default function KeyValueRow({ label, children }: KeyValueRowProps) {
    return (
        <TableRow>
            <TableCell className="font-medium bg-accent-foreground/20 dark:bg-accent/40">
                {label}
            </TableCell>
            <TableCell>{children}</TableCell>
        </TableRow>
    );
}
