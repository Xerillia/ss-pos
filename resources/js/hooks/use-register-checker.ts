import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

export interface CashItem {
    key: string;
    value: number;
    qty: number;
}

const DENOMINATIONS: CashItem[] = [
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

const BUNDLES: CashItem[] = [
    { key: "bundle_10000", value: 10000, qty: 0 },
    { key: "bundle_100000", value: 100000, qty: 0 },
    { key: "bundle_1000000", value: 1000000, qty: 0 },
    { key: "bundle_10000000", value: 10000000, qty: 0 },
];

export function useRegisterChecker() {
    const [denominations, setDenominations] = useLocalStorage<CashItem[]>(
        "checker_denomination",
        DENOMINATIONS,
        { initializeWithValue: false },
    );

    const [bundles, setBundles] = useLocalStorage<CashItem[]>(
        "checker_bundle",
        BUNDLES,
        { initializeWithValue: false },
    );

    const updateQuantity = (
        items: CashItem[],
        key: string,
        qty: number,
    ): CashItem[] => {
        const validQty = Math.max(0, qty);
        return items.map((item) =>
            item.key === key ? { ...item, qty: validQty } : item,
        );
    };

    const handleDenominationChange = (key: string, qty: number) => {
        setDenominations((prev) => updateQuantity(prev, key, qty));
    };

    const handleBundleChange = (key: string, qty: number) => {
        setBundles((prev) => updateQuantity(prev, key, qty));
    };

    const reset = () => {
        if (window.confirm("Are you sure you want to reset all quantities?")) {
            setDenominations(DENOMINATIONS);
            setBundles(BUNDLES);
        }
    };

    const countedCash = useMemo(() => {
        const totalDenoms = denominations.reduce(
            (acc, d) => acc + d.value * (d.qty || 0),
            0,
        );
        const totalBundles = bundles.reduce(
            (acc, b) => acc + b.value * (b.qty || 0),
            0,
        );
        return totalDenoms + totalBundles;
    }, [denominations, bundles]);

    return {
        denominations,
        bundles,
        countedCash,
        handleDenominationChange,
        handleBundleChange,
        reset,
    };
}
