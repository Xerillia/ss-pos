import { Head } from "@inertiajs/react";

export default function Customers() {
    return (
        <>
            <Head title="Customers" />
            <div className="m-4">
                <p>hi</p>
            </div>
        </>
    );
}

Customers.layout = {
    breadcrumbs: [
        {
            title: "Customers",
        },
    ],
};
