import { rupiah } from "@/lib/rupiah";
import { Card, CardContent } from "../ui/card";
import { CartItem } from "./useCart";
import { Button } from "../ui/button";
import { Minus, Plus, Tag, Trash } from "lucide-react";
import CartDiscountForm from "./cart-discount-form";
import { useCartContext } from "./cart-context";
import { useEffect, useState } from "react";

interface CartItemCardProps {
    item: CartItem;
    isExpanded: boolean;
    onToggleExpand: () => void;
}

export default function CardItemCard({
    item,
    isExpanded,
    onToggleExpand,
}: CartItemCardProps) {
    const {
        removeFromCart,
        incrementItem,
        decrementItem,
        setItemCount,
        subTotal,
        subTotalWithoutDiscount,
    } = useCartContext();

    const { product } = item;

    const subtotal = subTotal(product.id);
    const subtotalWithoutDiscount = subTotalWithoutDiscount(product.id);

    const [inputValue, setInputValue] = useState<string>(String(item.quantity));
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!isFocused) {
            setInputValue(String(item.quantity));
        }
    }, [item.quantity, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(",", ".");

        if (val === "") {
            setInputValue(val);
            return;
        }

        if (/^\d*\.?\d*$/.test(val)) {
            // keep it as a string
            if (val.endsWith(".")) {
                setInputValue(val);
            } else {
                const parsed = parseFloat(val);
                if (!isNaN(parsed)) {
                    setInputValue(val);
                }
            }
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const commitChange = () => {
        setIsFocused(false);
        const parsedNumber = parseFloat(inputValue);

        // fallback to 1 (or current quantity) if field is empty or zero
        if (isNaN(parsedNumber) || parsedNumber <= 0) {
            setInputValue(String(item.quantity));
            setItemCount(product.id, item.quantity);
            return;
        }

        setInputValue(String(parsedNumber));
        setItemCount(product.id, parsedNumber);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.currentTarget.blur();
        }
    };

    return (
        <Card className="hover:border hover:border-black/60 transition-colors dark:hover:border-white/30">
            <CardContent>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-bold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {rupiah(product.price)}
                        </p>
                    </div>
                    <Button
                        className="w-6 h-6 hover:text-red-500"
                        variant="ghost"
                        onClick={() => removeFromCart(product.id)}
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
                                    onClick={() => decrementItem(product.id)}
                                >
                                    <Minus className="p-0.5" />
                                </Button>
                                <div className="w-12">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        className="font-bold text-sm text-center block w-12"
                                        value={inputValue}
                                        onFocus={handleFocus}
                                        onChange={handleChange}
                                        onBlur={commitChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <Button
                                    className="w-6.5 h-6.5"
                                    onClick={() => incrementItem(product.id)}
                                >
                                    <Plus className="p-0.5" />
                                </Button>
                            </div>
                            <Button
                                size="xs"
                                variant="outline"
                                className={`h-6.5 ${
                                    subtotal === subtotalWithoutDiscount
                                        ? ""
                                        : "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950 hover:text-amber-700 dark:hover:text-amber-300"
                                }`}
                                onClick={onToggleExpand}
                            >
                                <Tag data-icon="inline-start" />{" "}
                                {subtotal === subtotalWithoutDiscount
                                    ? "Discount"
                                    : rupiah(
                                          subtotal - subtotalWithoutDiscount,
                                      )}
                            </Button>
                        </div>
                        <div className="flex flex-col">
                            {subtotal !== subtotalWithoutDiscount && (
                                <p className="text-muted-foreground font-mono text-xs text-right line-through">
                                    {rupiah(subtotalWithoutDiscount)}
                                </p>
                            )}
                            <p className="font-bold font-mono text-right">
                                {rupiah(subtotal)}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
            {isExpanded && (
                <CardContent>
                    <CartDiscountForm item={item} onClose={onToggleExpand} />
                </CardContent>
            )}
        </Card>
    );
}
