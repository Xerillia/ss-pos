import { HandCoins } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function RefundItemButton() {
    return (
        <AlertDialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                            <Button variant="secondary" size="xs">
                                <HandCoins />
                            </Button>
                        </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Add refunded items</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <AlertDialogContent
                className="max-w-5/6!"
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <AlertDialogHeader className="flex justify-between items-center">
                    <AlertDialogTitle>Refund System</AlertDialogTitle>
                    <AlertDialogCancel variant="destructive">
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogHeader>

                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Orders</CardTitle>
                            <CardDescription>
                                Select orders for items to refund
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Refund Items</CardTitle>
                            <CardDescription>
                                A list of items to be refunded
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
