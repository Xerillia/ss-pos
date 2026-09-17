import { Head } from "@inertiajs/react";

export default function Backup() {
    return (
        <>
            <Head title="Backup" />
            <p>hi</p>
        </>
    );
}

Backup.layout = {
    breadcrumbs: [
        {
            title: "Backup",
        },
    ],
};
