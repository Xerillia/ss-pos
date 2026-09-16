"use client";

import { Head } from "@inertiajs/react";
import ConverterMachine from "./converter-machine";
import ConverterTable from "./converter-table";

export default function Converter() {
    return (
        <>
            <Head title="Converter" />
            <div className="m-4 space-y-4">
                <ConverterMachine />
                <ConverterTable />
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
