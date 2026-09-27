import { Head } from "@inertiajs/react";

export default function Expenditures() {
    return (
        <>
            <Head title="Expenditures" />
            <div className="m-4">Hi</div>
        </>
    );
}

Expenditures.layout = {
    breadcrumbs: [
        {
            title: "Expenditures",
        },
    ],
};
