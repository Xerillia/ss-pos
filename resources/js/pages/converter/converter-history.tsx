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
import { useConversionHistory } from "@/lib/useConversionHistory";
import dayjs from "dayjs";

export default function ConverterHistory() {
    const { history } = useConversionHistory();

    return (
        <Card>
            <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>Saved past conversions.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>{record.fromValue}</TableCell>
                                <TableCell>{record.toValue}</TableCell>
                                <TableCell>
                                    {dayjs(new Date(record.timestamp)).format(
                                        "YYYY-MM-DD HH:mm:ss",
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
