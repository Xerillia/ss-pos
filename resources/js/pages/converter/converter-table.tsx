import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const data = [
    { letter: ["A", "K"], definition: "1" },
    { letter: ["B", "L"], definition: "2" },
    { letter: ["C", "M"], definition: "3" },
    { letter: ["D", "N"], definition: "4" },
    { letter: ["E", "O"], definition: "5" },
    { letter: ["P"], definition: "6" },
    { letter: ["G"], definition: "7" },
    { letter: ["R"], definition: "8" },
    { letter: ["S"], definition: "9" },
    { letter: ["T"], definition: "0" },
    { letter: ["U"], definition: "00" },
    { letter: ["V"], definition: "000" },
    { letter: ["W"], definition: "0000" },
    { letter: ["Z"], definition: "Repeat" },
];

export default function ConverterTable() {
    return (
        <Card className="w-1/4">
            <CardHeader>
                <CardTitle>Lookup Table</CardTitle>
                <CardDescription>
                    How to convert from letter to number.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="text-center">
                            <TableHead colSpan={2}>Letter</TableHead>
                            <TableHead>Definition</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.letter.at(0)}</TableCell>
                                <TableCell>{row.letter.at(1)}</TableCell>
                                <TableCell>{row.definition}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
