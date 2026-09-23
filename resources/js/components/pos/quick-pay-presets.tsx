import { Button } from "../ui/button";
import { useCartContext } from "./cart-context";

const PRESET_INCREMENTS = [
    { label: "+ 1k", value: 1000 },
    { label: "+ 2k", value: 2000 },
    { label: "+ 5k", value: 5000 },
    { label: "+ 10k", value: 10000 },
    { label: "+ 20k", value: 20000 },
    { label: "+ 50k", value: 50000 },
    { label: "+ 100k", value: 100000 },
    { label: "+ 200k", value: 200000 },
];

export function QuickPayPresets() {
    const { setPayAmount, cartTotal } = useCartContext();

    return (
        <div className="grid grid-cols-5 gap-3">
            <Button
                variant="destructive"
                size="sm"
                onClick={() => setPayAmount(0)}
            >
                Reset
            </Button>
            <Button size="sm" onClick={() => setPayAmount(cartTotal())}>
                Exact
            </Button>

            {PRESET_INCREMENTS.map(({ label, value }) => (
                <Button
                    key={value}
                    variant="secondary"
                    size="sm"
                    onClick={() => setPayAmount((prev) => (prev || 0) + value)}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
}
