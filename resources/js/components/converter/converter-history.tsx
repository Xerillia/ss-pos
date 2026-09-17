import {
    Card,
    CardAction,
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
import dayjs from "dayjs";
import { useConversionHistory } from "./converter-history-context";
import { Button } from "@/components/ui/button";

export default function ConverterHistory() {
    const { history, clearHistory } = useConversionHistory();

    return (
        <Card>
            <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>Saved past conversions.</CardDescription>
                <CardAction>
                    <Button variant="outline" onClick={clearHistory}>
                        Clear
                    </Button>
                </CardAction>
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
                        {history.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="text-center h-16"
                                >
                                    No history.
                                </TableCell>
                            </TableRow>
                        )}
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
