import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@inertiajs/react";
import { storeItem, updateItem } from "@/routes/product";
import { Product } from "@/types/product";
import {
    convertLetterToNumber,
    INVALID_LETTERS_EXCLUDE_NUMBER_REGEX,
} from "@/lib/converter";
import { Unit, UnitUtils } from "@/enums";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "../ui/combobox";

interface ItemFormProps {
    product?: Product;
    mode: "create" | "edit";
}

export default function ItemForm({ product, mode }: ItemFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || "",
        description: product?.description || "",
        capital: product?.capital || 0,
        price: product?.price || 0,
        quantity: product?.quantity || 0,
        unit: product?.unit || Unit.PIECE,
    });

    const handleCode = (value: string) => {
        return convertLetterToNumber(
            value.replace(INVALID_LETTERS_EXCLUDE_NUMBER_REGEX, ""),
        );
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === "create") {
            post(storeItem().url);
        } else {
            if (!product) {
                console.error("Product is required for edit mode.");
                return;
            }
            put(updateItem(product.id).url);
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(",", ".");

        if (val === "") {
            setData("quantity", 0);
            return;
        }

        // process if it's a valid decimal pattern
        if (/^\d*\.?\d*$/.test(val)) {
            // keep it as a string
            if (val.endsWith(".")) {
                setData("quantity", val as unknown as number);
            } else {
                const parsed = parseFloat(val);
                if (!isNaN(parsed)) {
                    setData("quantity", parsed);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Enter item name"
                    className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    placeholder="Enter item description"
                    className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && (
                    <p className="text-red-500">{errors.description}</p>
                )}
            </div>

            {/* Capital */}
            <div className="space-y-2">
                <Label htmlFor="capital">Capital</Label>
                <Input
                    id="capital"
                    type="text"
                    value={data.capital}
                    onChange={(e) =>
                        setData(
                            "capital",
                            parseInt(handleCode(e.target.value)) || 0,
                        )
                    }
                    placeholder="Enter item capital"
                    className={errors.capital ? "border-destructive" : ""}
                />
                {errors.capital && (
                    <p className="text-red-500">{errors.capital}</p>
                )}
            </div>

            {/* Price */}
            <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="text"
                    value={data.price}
                    onChange={(e) =>
                        setData(
                            "price",
                            parseInt(handleCode(e.target.value)) || 0,
                        )
                    }
                    placeholder="Enter item price"
                    className={errors.price ? "border-destructive" : ""}
                />
                {errors.price && <p className="text-red-500">{errors.price}</p>}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                    id="quantity"
                    type="text"
                    inputMode="decimal"
                    value={data.quantity}
                    onChange={handleQuantityChange}
                    placeholder="Enter item quantity"
                    className={errors.quantity ? "border-destructive" : ""}
                />
                {errors.quantity && (
                    <p className="text-red-500">{errors.quantity}</p>
                )}
            </div>

            {/* Unit */}
            <div>
                <Label htmlFor="unit">Unit</Label>
                <Combobox
                    items={UnitUtils.options()}
                    itemToStringLabel={(unit: Unit) => UnitUtils.label(unit)}
                    value={data.unit}
                    onValueChange={(unit: Unit | null) =>
                        setData("unit", unit ?? Unit.PIECE)
                    }
                >
                    <ComboboxInput placeholder="Select a unit" />
                    <ComboboxContent>
                        <ComboboxEmpty>No unit found.</ComboboxEmpty>
                        <ComboboxList>
                            {(unit) => (
                                <ComboboxItem key={unit} value={unit}>
                                    {UnitUtils.label(unit)}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={processing} size="sm">
                {processing ? (
                    <>
                        <Spinner data-icon="inline-start" />{" "}
                        {mode === "create" ? "Adding..." : "Updating..."}
                    </>
                ) : mode === "create" ? (
                    "Add Item"
                ) : (
                    "Update Item"
                )}
            </Button>
        </form>
    );
}
