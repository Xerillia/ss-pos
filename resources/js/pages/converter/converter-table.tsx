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

const first = [
    { letter: ["A", "K"], definition: "1" },
    { letter: ["B", "L"], definition: "2" },
    { letter: ["C", "M"], definition: "3" },
    { letter: ["D", "N"], definition: "4" },
    { letter: ["E", "O"], definition: "5" },
    { letter: ["P"], definition: "6" },
    { letter: ["G"], definition: "7" },
    { letter: ["R"], definition: "8" },
    { letter: ["S"], definition: "9" },
];

const second = [
    { letter: ["T"], definition: "0" },
    { letter: ["U"], definition: "00" },
    { letter: ["V"], definition: "000" },
    { letter: ["W"], definition: "0000" },
    { letter: ["Z"], definition: "Repeat" },
];

export default function ConverterTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Lookup Table</CardTitle>
                <CardDescription>
                    How to convert from letter to number.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
                <Table>
                    <TableHeader>
                        <TableRow className="text-center">
                            <TableHead colSpan={2}>Letter</TableHead>
                            <TableHead>Definition</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {first.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.letter.at(0)}</TableCell>
                                <TableCell>{row.letter.at(1)}</TableCell>
                                <TableCell>{row.definition}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow className="text-center">
                            <TableHead colSpan={2}>Letter</TableHead>
                            <TableHead>Definition</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {second.map((row, index) => (
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
