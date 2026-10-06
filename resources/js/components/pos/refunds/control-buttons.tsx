import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";
import { useRefundContext } from "./refund-context";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ControlButtons() {
    const { resetRefund } = useRefundContext();
    return (
        <div className="flex justify-between">
            <Tabs></Tabs>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="w-6.5 h-6.5"
                            onClick={() => resetRefund()}
                        >
                            <RefreshCw />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reset refund items</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
