import { useState, useEffect, useRef } from "react";

export function useLocalStorageState<T>(
    key: string,
    defaultValue: T | (() => T),
) {
    const [state, setState] = useState<T>(() => {
        return typeof defaultValue === "function"
            ? (defaultValue as () => T)()
            : defaultValue;
    });

    useEffect(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                setState(JSON.parse(saved));
            }
        } catch (error) {
            console.error(`Error loading localStorage key "${key}":`, error);
        }
    }, [key]);

    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error writing localStorage key "${key}":`, error);
        }
    }, [key, state]);

    return [state, setState] as const;
}
