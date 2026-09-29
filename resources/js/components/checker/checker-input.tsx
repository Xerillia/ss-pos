import { useEffect, useState } from "react";
import CheckerInputCard from "./checker-input-card";
import { Button } from "../ui/button";

interface CheckerInputProps {
    setCountedCash: (cash: number) => void;
}

const DENOMINATIONS = [
    { key: "coin_500", value: 500, qty: 0 },
    { key: "coin_1000", value: 1000, qty: 0 },
    { key: "note_1000", value: 1000, qty: 0 },
    { key: "note_2000", value: 2000, qty: 0 },
    { key: "note_5000", value: 5000, qty: 0 },
    { key: "note_10000", value: 10000, qty: 0 },
    { key: "note_20000", value: 20000, qty: 0 },
    { key: "note_50000", value: 50000, qty: 0 },
    { key: "note_100000", value: 100000, qty: 0 },
];

const BUNDLES = [
    { key: "bundle_10000", value: 10000, qty: 0 },
    { key: "bundle_100000", value: 100000, qty: 0 },
    { key: "bundle_1000000", value: 1000000, qty: 0 },
    { key: "bundle_10000000", value: 10000000, qty: 0 },
];

export default function CheckerInput({ setCountedCash }: CheckerInputProps) {
    const [denominations, setDenominations] = useState(DENOMINATIONS);
    const [bundles, setBundles] = useState(BUNDLES);

    const handleDenomination = (key: string, qty: number) => {
        qty = Math.max(0, qty); // disable negative

        setDenominations((prev) =>
            prev.map((denomination) => {
                if (denomination.key === key)
                    return { ...denomination, qty: qty };

                return denomination;
            }),
        );
    };

    const handleBundle = (key: string, qty: number) => {
        qty = Math.max(0, qty); // disable negative

        setBundles((prev) =>
            prev.map((bundle) => {
                if (bundle.key === key) return { ...bundle, qty: qty };

                return bundle;
            }),
        );
    };

    const totalCash = () => {
        const totalDenomination = denominations.reduce(
            (total, denomination) =>
                total + denomination.value * (denomination.qty || 0),
            0,
        );

        const totalBundle = bundles.reduce(
            (total, bundle) => total + bundle.value * (bundle.qty || 0),
            0,
        );

        return totalDenomination + totalBundle;
    };

    useEffect(() => {
        setCountedCash(totalCash());
    }, [denominations, bundles]);

    return (
        <>
            <Button variant="destructive" onClick={reset}>
                Reset
            </Button>
            <div className="grid grid-cols-2 items-stretch gap-4">
                <CheckerInputCard
                    objects={denominations}
                    handleOnChange={handleDenomination}
                />

                <CheckerInputCard
                    objects={bundles}
                    handleOnChange={handleBundle}
                />
            </div>
        </>
    );
}
