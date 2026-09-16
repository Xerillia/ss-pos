"use client";

import { Head } from "@inertiajs/react";
import ConverterMachine from "./converter-machine";
import ConverterTable from "./converter-table";
import ConverterHistory from "./converter-history";

export default function Converter() {
    return (
        <>
            <Head title="Converter" />
            <div className="m-4 space-y-4">
                <ConverterMachine />
                <div className="grid grid-cols-2 gap-3">
                    <ConverterTable />
                    <ConverterHistory />
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
