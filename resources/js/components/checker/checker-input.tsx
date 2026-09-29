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

const DENOMINATION_STORAGE_KEY = "checker_denomination";
const BUNDLE_STORAGE_KEY = "checker_bundle";

export default function CheckerInput({ setCountedCash }: CheckerInputProps) {
    const [denominations, setDenominations] = useState<
        { key: string; value: number; qty: number }[]
    >(() => {
        if (typeof window === "undefined") return DENOMINATIONS;
        try {
            const saved = localStorage.getItem(DENOMINATION_STORAGE_KEY);
            return saved ? JSON.parse(saved) : DENOMINATIONS;
        } catch (error) {
            console.error("Faled to load denominations:", error);
            return DENOMINATIONS;
        }
    });
    const [bundles, setBundles] = useState<
        { key: string; value: number; qty: number }[]
    >(() => {
        if (typeof window === "undefined") return BUNDLES;
        try {
            const saved = localStorage.getItem(BUNDLE_STORAGE_KEY);
            return saved ? JSON.parse(saved) : BUNDLES;
        } catch (error) {
            console.error("Failed to load bundles:", error);
            return BUNDLES;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                DENOMINATION_STORAGE_KEY,
                JSON.stringify(denominations),
            );
        } catch (error) {
            console.error(
                "Failed to save denominations to localStorage:",
                error,
            );
        }
    }, [denominations]);

    useEffect(() => {
        try {
            localStorage.setItem(BUNDLE_STORAGE_KEY, JSON.stringify(bundles));
        } catch (error) {
            console.error("Failed to save bundles to localStorage:", error);
        }
    }, [bundles]);

    const reset = () => {
        const confirmed = window.confirm(
            "Are you sure you want to reset all quantities?",
        );

        if (confirmed) {
            setDenominations(DENOMINATIONS);
            setBundles(BUNDLES);
        }
    };

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
