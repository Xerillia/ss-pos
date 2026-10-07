import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Input } from "../ui/input";
import { registerChecker } from "@/routes";
import { useLocalStorage } from "usehooks-ts";
interface StartingFloatFormProps {
    filters: {
        start_date: string;
        end_date: string;
        starting_float: number;
    };
}

export function StartingFloatForm({ filters }: StartingFloatFormProps) {
    const [storedFloat, setStoredFloat] = useLocalStorage(
        "checker_starting",
        filters.starting_float || 0,
    );

    const [startingFloat, setStartingFloat] = useState(storedFloat);

    // Initial mount check: sync server query if local value differs
    useEffect(() => {
        if (storedFloat !== 0 && storedFloat !== filters.starting_float) {
            submitFloat(storedFloat);
        }
    }, []);

    const submitFloat = (val: number) => {
        if (val === filters.starting_float) return;
        router.get(
            registerChecker(),
            { ...filters, starting_float: val },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value) || 0;
        setStartingFloat(val);
        setStoredFloat(val);
    };

    const handleSubmit = (e?: React.SyntheticEvent) => {
        if (e) e.preventDefault();
        submitFloat(startingFloat);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 max-w-sm"
        >
            <label className="text-xs font-medium text-gray-600">
                Starting:
            </label>
            <Input
                type="number"
                placeholder="Starting cash..."
                value={startingFloat === 0 ? "" : startingFloat}
                onChange={handleChange}
                onBlur={handleSubmit}
            />
        </form>
    );
}
