import { rupiah } from "@/lib/rupiah";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

interface CheckerInputCardProps {
    objects: { key: string; value: number; qty: number }[];
    handleOnChange: (key: string, qty: number) => void;
}

export default function CheckerInputCard({
    objects,
    handleOnChange,
}: CheckerInputCardProps) {
    return (
        <Card className="h-full">
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">
                                Denomination
                            </TableHead>
                            <TableHead>Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {objects.map((object) => (
                            <TableRow key={object.key} className="max-h">
                                <TableCell className="text-right w-32">
                                    {rupiah(object.value)}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={object.qty}
                                        onChange={(e) =>
                                            handleOnChange(
                                                object.key,
                                                parseInt(e.target.value),
                                            )
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
