import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";

const MAX_HISTORY_ITEMS = 10;

interface HistoryRecord {
    id: string;
    fromValue: string;
    toValue: string;
    timestamp: number;
}

interface HistoryContextType {
    history: HistoryRecord[];
    addConversion: (from: string, to: string) => void;
    clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function ConverterHistoryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [history, setHistory] = useState<HistoryRecord[]>(() => {
        // Load from localStorage so it persists on page refresh
        const saved = localStorage.getItem("conversion_history");
        return saved ? JSON.parse(saved) : [];
    });

    const addConversion = (fromValue: string, toValue: string) => {
        setHistory((prev) => {
            const newRecord: HistoryRecord = {
                id: v4(),
                timestamp: Date.now(),
                fromValue,
                toValue,
            };
            const updated = [newRecord, ...prev].slice(0, MAX_HISTORY_ITEMS);
            localStorage.setItem("conversion_history", JSON.stringify(updated));
            return updated;
        });
    };

    const clearHistory = () => {
        setHistory(() => {
            localStorage.removeItem("conversion_history");
            return [];
        });
    };

    return (
        <HistoryContext.Provider
            value={{ history, addConversion, clearHistory }}
        >
            {children}
        </HistoryContext.Provider>
    );
}

// The unified hook used by both components
export function useConversionHistory() {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error(
            "useConversionHistory must be used within a ConversionHistoryProvider",
        );
    }
    return context;
}
