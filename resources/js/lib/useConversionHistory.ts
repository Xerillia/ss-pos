import { useState, useEffect } from "react";
import { v4 } from "uuid";

export interface ConversionRecord {
    id: string;
    timestamp: number;
    fromValue: string;
    toValue: string;
}

const STORAGE_KEY = "conversion_history";
const MAX_HISTORY_ITEMS = 20;

export function useConversionHistory(
    storageType: "local" | "session" = "local",
) {
    const storage = storageType === "local" ? localStorage : sessionStorage;

    // Initialize state lazily from storage
    const [history, setHistory] = useState<ConversionRecord[]>(() => {
        try {
            const data = storage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Failed to parse history:", error);
            return [];
        }
    });

    // Keep storage in sync whenever state changes
    useEffect(() => {
        try {
            storage.setItem(STORAGE_KEY, JSON.stringify(history));
        } catch (error) {
            console.error("Failed to save history:", error);
        }
    }, [history, storage]);

    const addConversion = (fromValue: string, toValue: string) => {
        const newRecord: ConversionRecord = {
            id: v4(),
            timestamp: Date.now(),
            fromValue,
            toValue,
        };
        setHistory((prev) => [newRecord, ...prev].slice(0, MAX_HISTORY_ITEMS));
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return { history, addConversion, clearHistory };
}
