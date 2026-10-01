import ShowSaleTable from "@/components/sales/show-sale-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SaleStatus, SaleStatusUtils } from "@/enums";
import { archive } from "@/lib/archive";
import { sales, updateSale } from "@/routes/sales";
import { Sale } from "@/types/sale";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

interface ShowSaleProps {
    sale: Sale;
}

export default function ShowSale({ sale }: ShowSaleProps) {
    const { data, setData, put, processing, errors } = useForm({
        notes: sale.notes || "",
        status: sale.status || "completed",
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        const toastId = toast.loading("Updating sale...");

        put(updateSale(sale.id).url, {
            onSuccess: () => {
                toast.success(
                    `Sale ${sale.sale_number} updated successfully!`,
                    { id: toastId },
                );
            },
            onError: () => {
                toast.error(
                    `An error has occured while updating sale ${sale.sale_number}!`,
                    { id: toastId },
                );
            },
        });
    };

    return (
        <>
            <Head title={`Sale ${sale.sale_number}`} />
            <div className="m-4 space-y-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>{sale.sale_number}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {archive(sale.sale_date)}
                            </p>
                        </div>
                        <Badge variant="outline">{sale.payment_status}</Badge>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Products Table */}
                        <div>
                            <h3 className="text-sm font-semibold mb-2">
                                Purchased Items
                            </h3>
                            <div className="border rounded-md overflow-hidden">
                                <ShowSaleTable sale={sale} />
                            </div>
                        </div>

                        {/* Update Form */}
                        <form
                            onSubmit={handleUpdate}
                            className="space-y-4 border-t pt-4"
                        >
                            <h3 className="text-sm font-semibold">
                                Update Sale Status
                            </h3>

                            <div>
                                <label className="text-sm font-medium">
                                    Status
                                </label>
                                <Select
                                    value={data.status}
                                    onValueChange={(val: SaleStatus) =>
                                        setData("status", val)
                                    }
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SaleStatusUtils.options().map(
                                            (option) => (
                                                <SelectItem
                                                    key={option}
                                                    value={option}
                                                >
                                                    {SaleStatusUtils.label(
                                                        option,
                                                    )}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Notes
                                </label>
                                <Textarea
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    className="mt-1"
                                    rows={3}
                                />
                                {errors.notes && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.notes}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Save Changes"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ShowSale.layout = (page: any) => {
    return {
        breadcrumbs: [
            {
                title: "Sales",
                href: sales(),
            },
            {
                title: page.sale.sale_number,
            },
        ],
    };
};
