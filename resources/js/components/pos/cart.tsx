import { Minus, Plus, ShoppingCart, Tag, Trash } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { CartItem } from "./useCart";
import { rupiah } from "@/lib/rupiah";
import { Button } from "../ui/button";
import { useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";

interface CartProps {
    cart: CartItem[];
    removeFromCart: (productId: string | number) => void;
    incrementItem: (productId: string | number) => void;
    decrementItem: (productId: string | number) => void;
    subTotal: (productId: string | number) => number;
    cartTotal: () => number;
    setUnitDiscount: (productId: string | number, discount: number) => void;
    setFlatDiscount: (productId: string | number, discount: number) => void;
}

export default function Cart({
    cart,
    removeFromCart,
    incrementItem,
    decrementItem,
    subTotal,
    cartTotal,
    setUnitDiscount,
    setFlatDiscount,
}: CartProps) {
    const [expandId, setExpandId] = useState<number | null>();

    const handleExpand = (id: number) => {
        if (expandId === id) setExpandId(null);
        else setExpandId(id);
    };

    return (
        <Card className="max-h-dvh overflow-y-auto">
            <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                    <ShoppingCart
                        data-icon="inline-start"
                        className="w-4 h-4"
                    />
                    Cart
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div className="space-y-2">
                    {cart.map((item) => {
                        const product = item.product;

                        return (
                            <Card key={product.id}>
                                <CardContent>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-bold">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {rupiah(product.price)}
                                            </p>
                                        </div>
                                        <Button
                                            className="w-6 h-6 hover:text-red-500"
                                            variant="ghost"
                                            onClick={() =>
                                                removeFromCart(product.id)
                                            }
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2 items-center">
                                                <div className="flex gap-1 items-center">
                                                    <Button
                                                        className="w-6.5 h-6.5"
                                                        onClick={() =>
                                                            decrementItem(
                                                                product.id,
                                                            )
                                                        }
                                                    >
                                                        <Minus className="p-0.5" />
                                                    </Button>
                                                    <div className="w-12">
                                                        <p className="font-bold text-sm text-center">
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        className="w-6.5 h-6.5"
                                                        onClick={() =>
                                                            incrementItem(
                                                                product.id,
                                                            )
                                                        }
                                                    >
                                                        <Plus className="p-0.5" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    size="xs"
                                                    variant="outline"
                                                    className="h-6.5"
                                                    onClick={() =>
                                                        handleExpand(product.id)
                                                    }
                                                >
                                                    <Tag data-icon="inline-start" />{" "}
                                                    Discount
                                                </Button>
                                            </div>
                                            <p className="font-bold font-mono">
                                                {rupiah(subTotal(product.id))}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                                {expandId === product.id && (
                                    <CardContent>
                                        <Card className="mt-2">
                                            <CardContent className="-mx-2 px-4 -my-6 py-3">
                                                <FieldGroup>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Field>
                                                            <FieldLabel
                                                                htmlFor={`unit_discount_${product.id}`}
                                                                className="text-xs -mb-2 text-muted-foreground"
                                                            >
                                                                Unit Discount
                                                                (Rp)
                                                            </FieldLabel>
                                                            <Input
                                                                id={`unit_discount_${product.id}`}
                                                                placeholder="0"
                                                                type="number"
                                                                min="0"
                                                                value={
                                                                    item.unit_discount ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    setUnitDiscount(
                                                                        product.id,
                                                                        Math.max(
                                                                            0,
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            ) ||
                                                                                0,
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
                                                                Flat Discount
                                                                (Rp)
                                                            </FieldLabel>
                                                            <Input
                                                                id={`flat_discount_${product.id}`}
                                                                placeholder="0"
                                                                type="number"
                                                                min="0"
                                                                value={
                                                                    item.flat_discount ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    setFlatDiscount(
                                                                        product.id,
                                                                        Math.max(
                                                                            0,
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            ) ||
                                                                                0,
                                                                        ),
                                                                    )
                                                                }
                                                            />
                                                        </Field>
                                                    </div>
                                                </FieldGroup>
                                                <Field>
                                                    <Button
                                                        size="xs"
                                                        className="mt-2"
                                                        onClick={() =>
                                                            setExpandId(null)
                                                        }
                                                    >
                                                        Done
                                                    </Button>
                                                </Field>
                                            </CardContent>
                                        </Card>
                                    </CardContent>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </CardContent>
            <CardContent className="mt-auto border-t py-4 sticky -bottom-6 bg-background -mb-6">
                <div className="font-bold flex justify-between">
                    <p>Total Amount</p>
                    <p className="font-mono">{rupiah(cartTotal())}</p>
                </div>
            </CardContent>
        </Card>
    );
}
