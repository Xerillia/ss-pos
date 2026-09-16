"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Head } from "@inertiajs/react";

export default function Converter() {
    return (
        <>
            <Head title="Converter" />
            <div className="m-4">
                <div className="flex gap-3 text-sm">
                    <Card className="w-1/2">
                        <CardHeader>
                            <CardTitle>Letter</CardTitle>
                            <CardDescription>
                                Enter the letters to be converted. Result will
                                appear in the right side.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Input />
                        </CardContent>
                    </Card>
                    <Card className="w-1/2">
                        <CardHeader>
                            <CardTitle>Number</CardTitle>
                            <CardDescription>
                                Enter the numbers to be converted. Result will
                                appear in the left side.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Input />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Converter.layout = {
    breadcrumbs: [
        {
            title: "Converter",
        },
    ],
};
