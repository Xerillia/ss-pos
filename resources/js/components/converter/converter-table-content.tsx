import { TableCell, TableRow } from "@/components/ui/table";

interface ConverterTableContentProps {
    data: {
        letter: string[];
        definition: string;
    }[];
}

export default function ConverterTableContent({
    data,
}: ConverterTableContentProps) {
    return data.map((row, index) => (
        <TableRow key={index}>
            <TableCell>{row.letter.at(0)}</TableCell>
            <TableCell>{row.letter.at(1)}</TableCell>
            <TableCell>{row.definition}</TableCell>
        </TableRow>
    ));
}
