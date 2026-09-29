import {
    PaymentMethod,
    PaymentMethodUtils,
    PaymentStatus,
    PaymentStatusUtils,
} from "@/enums";
import { Expenditure, ExpenseCategory } from "@/types/expenditure";
import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "../ui/combobox";
import { Textarea } from "../ui/textarea";
import { storeExpenditure, updateExpenditure } from "@/routes/expenditure";
import { toast } from "sonner";
import { utcToLocalIso } from "@/lib/archive";

interface ExpenditureFormProps {
    expenditure?: Expenditure;
    mode: "create" | "edit";
    categories: ExpenseCategory[];
}

export default function ExpenditureForm({
    expenditure,
    mode,
    categories,
}: ExpenditureFormProps) {
    const { data, setData, post, put, processing, errors, transform } = useForm(
        {
            title: expenditure?.title || "",
            amount: expenditure?.amount || 0,
            expense_date: utcToLocalIso(expenditure?.expense_date),
            payment_method: expenditure?.payment_method || PaymentMethod.CASH,
            status: expenditure?.status || PaymentStatus.PAID,
            reference_number: expenditure?.reference_number || "",
            category: expenditure?.category || null,
            notes: expenditure?.notes || "",
        },
    );

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            expense_category_id: data.category?.id ?? null,
        }));

        if (mode === "create") {
            const toastId = toast.loading("Creating expenditure...");

            post(storeExpenditure().url, {
                onSuccess: () => {
                    toast.success("Expenditure created successfully!", {
                        id: toastId,
                    });
                },
                onError: (error) => {
                    toast.error(
                        error.message || "Failed to create expenditure",
                        {
                            id: toastId,
                        },
                    );
                },
            });
        } else {
            if (!expenditure) {
                console.error("Expenditure is required for edit mode.");
                return;
            }

            const toastId = toast.loading("Updating expenditure...");

            put(updateExpenditure(expenditure).url, {
                onSuccess: () => {
                    toast.success("Expenditure updated successfully!", {
                        id: toastId,
                    });
                },
                onError: (error) => {
                    toast.error(
                        error.message || "Failed to update expenditure",
                        {
                            id: toastId,
                        },
                    );
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    placeholder="Enter expenditure title"
                    className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                    id="amount"
                    type="text"
                    inputMode="numeric"
                    value={data.amount}
                    onChange={(e) =>
                        setData("amount", parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter expenditure amount"
                    className={errors.amount ? "border-destructive" : ""}
                />
                {errors.amount && (
                    <p className="text-red-500">{errors.amount}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="expense_date">Expense Date</Label>
                <Input
                    id="expense_date"
                    type="datetime-local"
                    value={data.expense_date}
                    onChange={(e) => setData("expense_date", e.target.value)}
                    placeholder="Enter expenditure date"
                    className={
                        "w-fit " +
                        (errors.expense_date ? "border-destructive" : "")
                    }
                />
                {errors.expense_date && (
                    <p className="text-red-500">{errors.expense_date}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="payment_method">Payment Method</Label>
                <Select
                    value={data.payment_method}
                    onValueChange={(value) =>
                        setData("payment_method", value as PaymentMethod)
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                        {PaymentMethodUtils.options().map((method) => (
                            <SelectItem key={method} value={method}>
                                {PaymentMethodUtils.label(method)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.payment_method && (
                    <p className="text-red-500">{errors.payment_method}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">Payment Status</Label>
                <Select
                    value={data.status}
                    onValueChange={(value) =>
                        setData("status", value as PaymentStatus)
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                        {PaymentStatusUtils.options().map((method) => (
                            <SelectItem key={method} value={method}>
                                {PaymentStatusUtils.label(method)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.status && (
                    <p className="text-red-500">{errors.status}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="reference_number">Reference Number</Label>
                <Input
                    id="reference_number"
                    value={data.reference_number}
                    onChange={(e) =>
                        setData("reference_number", e.target.value)
                    }
                    placeholder="Enter reference number"
                    className={
                        errors.reference_number ? "border-destructive" : ""
                    }
                />
                {errors.reference_number && (
                    <p className="text-red-500">{errors.reference_number}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Combobox
                    value={data.category}
                    items={categories}
                    itemToStringLabel={(category) => category.name}
                    onValueChange={(category) => setData("category", category)}
                >
                    <ComboboxInput placeholder="Select category (optional)" />
                    <ComboboxContent>
                        <ComboboxEmpty>No category found.</ComboboxEmpty>
                        <ComboboxList>
                            {(category: ExpenseCategory) => (
                                <ComboboxItem
                                    key={category.id}
                                    value={category}
                                >
                                    {category.name}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                    placeholder="Enter notes"
                    className={
                        "resize-none " +
                        (errors.notes ? "border-destructive" : "")
                    }
                />
                {errors.notes && <p className="text-red-500">{errors.notes}</p>}
            </div>

            <Button type="submit" disabled={processing} size="sm">
                {processing ? (
                    <>
                        <Spinner data-icon="inline-start" />{" "}
                        {mode === "create" ? "Adding..." : "Updating..."}
                    </>
                ) : mode === "create" ? (
                    "Add expenditure"
                ) : (
                    "Update expenditure"
                )}
            </Button>
        </form>
    );
}
