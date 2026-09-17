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

    return (
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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
                    value={data.quantity}
                    onChange={(e) =>
                        setData("quantity", parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter item quantity"
                    className={errors.quantity ? "border-destructive" : ""}
                />
                {errors.quantity && (
                    <p className="text-red-500">{errors.quantity}</p>
                )}
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
