import { HandCoins } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
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
import OrderCard from "./refunds/order-card";
import RefundCard from "./refunds/refund-card";
import { Sale } from "@/types/sale";
import ControlButtons from "./refunds/control-buttons";

interface RefundItemButtonProps {
    sales: Sale[];
}

export default function RefundItemButton({ sales }: RefundItemButtonProps) {
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
                    <TooltipContent>Manage refunds</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <AlertDialogContent
                className="max-w-5/6!"
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <AlertDialogHeader className="flex justify-between items-center">
                    <AlertDialogTitle>Refund System</AlertDialogTitle>
                    <AlertDialogCancel>Return</AlertDialogCancel>
                </AlertDialogHeader>

                <AlertDialogDescription className="space-y-4 overflow-y-auto max-h-[80vh]">
                    <ControlButtons />

                    <div className="grid grid-cols-2 gap-4">
                        <OrderCard sales={sales} />
                        <RefundCard />
                    </div>
                </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>
    );
}
