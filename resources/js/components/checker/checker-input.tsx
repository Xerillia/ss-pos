import { useEffect } from "react";
import CheckerInputCard from "./checker-input-card";
import { StartingFloatForm } from "./starting-float-form";
import { Button } from "../ui/button";
import { useRegisterChecker } from "@/hooks/use-register-checker";

interface CheckerInputProps {
    setCountedCash: (cash: number) => void;
    filters: {
        start_date: string;
        end_date: string;
        starting_float: number;
    };
}

export default function CheckerInput({
    setCountedCash,
    filters,
}: CheckerInputProps) {
    const {
        denominations,
        bundles,
        countedCash,
        handleDenominationChange,
        handleBundleChange,
        reset,
    } = useRegisterChecker();

    useEffect(() => {
        setCountedCash(countedCash);
    }, [countedCash, setCountedCash]);

    return (
        <div className="space-y-4">
            <div className="flex gap-4 items-center">
                <StartingFloatForm filters={filters} />
                <Button variant="destructive" onClick={reset}>
                    Reset
                </Button>
            </div>

            <div className="grid grid-cols-2 items-stretch gap-4">
                <CheckerInputCard
                    objects={denominations}
                    handleOnChange={handleDenominationChange}
                    label="Denomination"
                />
                <CheckerInputCard
                    objects={bundles}
                    handleOnChange={handleBundleChange}
                    label="Bundle"
                />
            </div>
        </div>
    );
}
