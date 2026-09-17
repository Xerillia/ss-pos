"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    convertLetterToNumber,
    convertNumberToLetter,
    INVALID_LETTERS_REGEX,
} from "@/lib/converter";
import { useState } from "react";
import { useConversionHistory } from "./converter-history-context";

export default function ConverterMachine() {
    const { history, addConversion } = useConversionHistory();

    const [letter, setLetter] = useState("");
    const [number, setNumber] = useState("");

    const handleLetter = (value: string) => {
        const replaced = value
            .toLocaleUpperCase()
            .replace(INVALID_LETTERS_REGEX, "");
        setLetter(replaced);
        setNumber(convertLetterToNumber(replaced));
    };

    const handleNumber = (value: string) => {
        const replaced = value.replace(/\D/g, "");
        setNumber(replaced);
        setLetter(convertNumberToLetter(replaced));
    };

    const handleSaveLetterToNumber = () => {
        if (letter.trim() && number.trim()) {
            // Get the most recent saved item
            const latest = history[0];

            // Only save if it's different from the last entry
            if (
                !latest ||
                (latest.fromValue !== letter && latest.toValue !== number)
            ) {
                addConversion(letter, Number(number).toLocaleString("de-DE"));
            }
        }
    };

    const handleSaveNumberToLetter = () => {
        if (letter.trim() && number.trim()) {
            // Get the most recent saved item
            const latest = history[0];

            // Only save if it's different from the last entry
            if (
                !latest ||
                (latest.fromValue !== number && latest.toValue !== letter)
            ) {
                addConversion(Number(number).toLocaleString("de-DE"), letter);
            }
        }
    };

    return (
        <div className="flex gap-3 text-sm">
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Letter</CardTitle>
                    <CardDescription>
                        Enter the letters to be converted. Result will appear in
                        the right side.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        value={letter}
                        onChange={(e) => handleLetter(e.target.value)}
                        onBlur={handleSaveLetterToNumber}
                    />
                </CardContent>
            </Card>
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Number</CardTitle>
                    <CardDescription>
                        Enter the numbers to be converted. Result will appear in
                        the left side.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        value={number}
                        onChange={(e) => handleNumber(e.target.value)}
                        onBlur={handleSaveNumberToLetter}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
