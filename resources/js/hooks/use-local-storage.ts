import { useState, useEffect } from "react";

export function useLocalStorageState<T>(
    key: string,
    defaultValue: T | (() => T),
) {
    const [state, setState] = useState<T>(() => {
        if (typeof window === "undefined") {
            return typeof defaultValue === "function"
                ? (defaultValue as () => T)()
                : defaultValue;
        }
        try {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error(`Error loading localStorage key "${key}":`, error);
        }
        return typeof defaultValue === "function"
            ? (defaultValue as () => T)()
            : defaultValue;
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error writing localStorage key "${key}":`, error);
        }
    }, [key, state]);

    return [state, setState] as const;
}
