import { Card, CardContent } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { CartItem } from "./useCart";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCartContext } from "./cart-context";

interface CartDiscountFormProps {
    item: CartItem;
    onClose: () => void;
}

export default function CartDiscountForm({
    item,
    onClose,
}: CartDiscountFormProps) {
    const { setUnitDiscount, setFlatDiscount } = useCartContext();
    const { product } = item;

    return (
        <Card className="mt-2">
            <CardContent className="-mx-2 px-4 -my-6 py-3">
                <FieldGroup>
                    <div className="grid grid-cols-2 gap-2">
                        <Field>
                            <FieldLabel
                                htmlFor={`unit_discount_${product.id}`}
                                className="text-xs -mb-2 text-muted-foreground"
                            >
                                Unit Discount (Rp)
                            </FieldLabel>
                            <Input
                                id={`unit_discount_${product.id}`}
                                placeholder="0"
                                type="number"
                                min="0"
                                value={item.unit_discount || ""}
                                onChange={(e) =>
                                    setUnitDiscount(
                                        product.id,
                                        Math.max(
                                            0,
                                            Number(e.target.value) || 0,
                                        ),
                                    )
                                }
                            />
                        </Field>
                        <Field>
                            <FieldLabel
                                htmlFor={`flat_discount_${product.id}`}
                                className="text-xs -mb-2 text-muted-foreground"
                            >
                                Flat Discount (Rp)
                            </FieldLabel>
                            <Input
                                id={`flat_discount_${product.id}`}
                                placeholder="0"
                                type="number"
                                min="0"
                                value={item.flat_discount || ""}
                                onChange={(e) =>
                                    setFlatDiscount(
                                        product.id,
                                        Math.max(
                                            0,
                                            Number(e.target.value) || 0,
                                        ),
                                    )
                                }
                            />
                        </Field>
                    </div>
                </FieldGroup>

                <Field>
                    <Button size="xs" className="mt-2" onClick={onClose}>
                        Done
                    </Button>
                </Field>
            </CardContent>
        </Card>
    );
}
