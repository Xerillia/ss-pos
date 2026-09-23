import { Customer } from "@/types/customer";
import { useForm } from "@inertiajs/react";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { storeCustomer, updateCustomer } from "@/routes/customer";
import { toast } from "sonner";
import ErrorLabel from "../error-label";

interface CustomerFormProps {
    customer?: Customer;
    mode: "create" | "edit";
}

interface CustomerForm {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    credit_limit: number | string;
    is_active: boolean;
    notes: string;
}

export default function CustomerForm({ customer, mode }: CustomerFormProps) {
    const { data, setData, post, put, processing, errors, transform } =
        useForm<CustomerForm>({
            name: customer?.name || "",
            email: customer?.email || "",
            phone: customer?.phone || "",
            address: customer?.address || "",
            city: customer?.city || "",
            postal_code: customer?.postal_code || "",
            credit_limit: customer?.credit_limit || "",
            is_active: customer ? customer.is_active : true,
            notes: customer?.notes || "",
        });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            credit_limit:
                data.credit_limit !== "" ? Number(data.credit_limit) : null,
        }));

        if (mode === "create") {
            const toastId = toast.loading("Adding customer...");

            post(storeCustomer().url, {
                onSuccess: (page) => {
                    const props = page.props as typeof page.props & {
                        flash?: { success?: string };
                    };

                    toast.success(props.flash?.success || "Customer added!", {
                        id: toastId,
                    });
                },
                onError: () =>
                    toast.error("An error has occured!", { id: toastId }),
            });
        } else {
            if (!customer) {
                console.error("Customer is required for edit mode.");
                return;
            }
            const toastId = toast.loading("Updating customer...");

            put(updateCustomer(customer.id).url, {
                onSuccess: (page) => {
                    const props = page.props as typeof page.props & {
                        flash?: { success?: string };
                    };

                    toast.success(props.flash?.success || "Customer updated!", {
                        id: toastId,
                    });
                },
                onError: () =>
                    toast.error("An error has occured!", { id: toastId }),
            });
        }
    };

    const handlePhoneInput = (value: string) => {
        setData("phone", value.replace(/[^\d]/g, ""));
    };

    const handleCreditLimitInput = (value: string) => {
        setData("credit_limit", value.replace(/[^\d.]/g, ""));
    };

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>
                        <div className="grid grid-cols-3 gap-4">
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Customer Name
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    autoFocus
                                />
                                <ErrorLabel error={errors.name} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Customer Email
                                </FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@gmail.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <ErrorLabel error={errors.email} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="phone">
                                    Customer Phone
                                </FieldLabel>
                                <Input
                                    id="phone"
                                    type="text"
                                    placeholder="081234567890"
                                    value={data.phone}
                                    onChange={(e) =>
                                        handlePhoneInput(e.target.value)
                                    }
                                />
                                <ErrorLabel error={errors.phone} />
                            </Field>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Field>
                                <FieldLabel htmlFor="address">
                                    Customer Address
                                </FieldLabel>
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder="15 Street"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />
                                <ErrorLabel error={errors.address} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="city">
                                    Customer City
                                </FieldLabel>
                                <Input
                                    id="city"
                                    type="text"
                                    placeholder="Woodland"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                />
                                <ErrorLabel error={errors.city} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="postal_code">
                                    Customer Postal Code
                                </FieldLabel>
                                <Input
                                    id="postal_code"
                                    type="text"
                                    placeholder="12345"
                                    value={data.postal_code}
                                    onChange={(e) =>
                                        setData("postal_code", e.target.value)
                                    }
                                />
                                <ErrorLabel error={errors.postal_code} />
                            </Field>
                        </div>
                        <Field>
                            <FieldLabel htmlFor="credit_limit">
                                Credit Limit
                                <span className="text-red-500">*</span>
                            </FieldLabel>
                            <Input
                                id="credit_limit"
                                type="text"
                                placeholder="200000"
                                value={data.credit_limit}
                                onChange={(e) =>
                                    handleCreditLimitInput(e.target.value)
                                }
                            />
                            <ErrorLabel error={errors.credit_limit} />
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <FieldSeparator />
                <FieldSet className="gap-2">
                    <FieldLegend>
                        Status <span className="text-red-500">*</span>
                    </FieldLegend>
                    <FieldDescription>
                        Is the customer still active?
                    </FieldDescription>
                    <FieldGroup>
                        <Field orientation="horizontal">
                            <Checkbox
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) =>
                                    setData("is_active", Boolean(checked))
                                }
                            />
                            <FieldLabel htmlFor="is_active">Active</FieldLabel>
                            <ErrorLabel error={errors.is_active} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="notes">Notes</FieldLabel>
                            <Input
                                id="notes"
                                type="text"
                                placeholder="Short description"
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                className="max-w-md"
                            />
                            <ErrorLabel error={errors.notes} />
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit" size="sm" disabled={processing}>
                        {mode === "create" &&
                            (processing ? "Adding..." : "Add Customer")}
                        {mode === "edit" &&
                            (processing ? "Updating..." : "Update Customer")}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
}
