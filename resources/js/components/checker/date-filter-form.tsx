import { router } from "@inertiajs/react";
import { Input } from "../ui/input";
import { registerChecker } from "@/routes";
import { ymd, archive } from "@/lib/archive";

interface DateFilterFormProps {
    filters: {
        start_date: string;
        end_date: string;
        starting_float: number;
    };
}

export function DateFilterForm({ filters }: DateFilterFormProps) {
    // Read the current date filter in YYYY-MM-DD format
    const selectedDateYmd = ymd(filters.start_date || new Date());

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateStr = e.target.value;
        if (!dateStr) return;

        // Set start of day (00:00:00) and end of day (23:59:59) for the selected date
        const fullStartDate = archive(`${dateStr} 00:00:00`);
        const fullEndDate = archive(`${dateStr} 23:59:59`);

        router.get(
            registerChecker(),
            {
                ...filters,
                start_date: fullStartDate,
                end_date: fullEndDate,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600">Date:</label>
            <Input
                type="date"
                value={selectedDateYmd}
                onChange={handleDateChange}
                className="w-auto"
            />
        </div>
    );
}
