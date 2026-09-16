"use client";

import { Head } from "@inertiajs/react";
import ConverterMachine from "./converter-machine";

export default function Converter() {
    return (
        <>
            <Head title="Converter" />
            <div className="m-4">
                <ConverterMachine />
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
