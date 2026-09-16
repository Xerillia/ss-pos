"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { convertLetterToNumber, convertNumberToLetter } from "@/lib/converter";
import { useEffect, useState } from "react";

export default function ConverterMachine() {
    const [letter, setLetter] = useState("");
    const [number, setNumber] = useState("");

    const handleLetter = (value: string) => {
        const replaced = value
            .toLocaleUpperCase()
            .replace(/[^[ABCDEPGRSKLMOTUVWZ]/giu, "");
        setLetter(replaced);
        setNumber(convertLetterToNumber(replaced));
    };

    const handleNumber = (value: string) => {
        const replaced = value.replace(/\D/g, "");
        setNumber(replaced);
        setLetter(convertNumberToLetter(replaced));
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
                    />
                </CardContent>
            </Card>
        </div>
    );
}
