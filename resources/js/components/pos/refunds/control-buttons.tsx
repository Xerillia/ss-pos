import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";
import { useRefundContext } from "./refund-context";

export default function ControlButtons() {
    const { resetRefund } = useRefundContext();
    return (
        <div className="flex justify-between">
            <Tabs></Tabs>

            <Button
                variant="destructive"
                size="sm"
                className="w-6.5 h-6.5"
                onClick={() => resetRefund()}
            >
                <RefreshCw />
            </Button>
        </div>
    );
}
