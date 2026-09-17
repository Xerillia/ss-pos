"use client";

import { Head } from "@inertiajs/react";
import ConverterMachine from "../components/converter/converter-machine";
import ConverterTable from "../components/converter/converter-table";
import ConverterHistory from "../components/converter/converter-history";
import { ConverterHistoryProvider } from "../components/converter/converter-history-context";

export default function Converter() {
    return (
        <>
            <Head title="Converter" />
            <ConverterHistoryProvider>
                <div className="m-4 space-y-4">
                    <ConverterMachine />
                    <div className="grid grid-cols-2 gap-3">
                        <ConverterTable />
                        <ConverterHistory />
                    </div>
                </div>
            </ConverterHistoryProvider>
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
