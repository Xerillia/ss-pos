import { rupiah } from "@/lib/rupiah";
import { Card, CardContent } from "../ui/card";
import { CartItem } from "./useCart";
import { Button } from "../ui/button";
import { Minus, Plus, Tag, Trash } from "lucide-react";
import CartDiscountForm from "./cart-discount-form";

interface CartItemCardProps {
    item: CartItem;
    isExpanded: boolean;
    onToggleExpand: () => void;
    removeFromCart: (productId: string | number) => void;
    incrementItem: (productId: string | number) => void;
    decrementItem: (productId: string | number) => void;
    subTotal: (productId: string | number) => number;
    setUnitDiscount: (productId: string | number, discount: number) => void;
    setFlatDiscount: (productId: string | number, discount: number) => void;
}

export default function CardItemCard({
    item,
    isExpanded,
    onToggleExpand,
    removeFromCart,
    incrementItem,
    decrementItem,
    subTotal,
    setUnitDiscount,
    setFlatDiscount,
}: CartItemCardProps) {
    const { product } = item;

    return (
        <Card>
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
                                    <p className="font-bold text-sm text-center">
                                        {item.quantity}
                                    </p>
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
                                className="h-6.5"
                                onClick={onToggleExpand}
                            >
                                <Tag data-icon="inline-start" /> Discount
                            </Button>
                        </div>
                        <p className="font-bold font-mono">
                            {rupiah(subTotal(product.id))}
                        </p>
                    </div>
                </div>
            </CardContent>
            {isExpanded && (
                <CardContent>
                    <CartDiscountForm
                        item={item}
                        setUnitDiscount={setUnitDiscount}
                        setFlatDiscount={setFlatDiscount}
                        onClose={onToggleExpand}
                    />
                </CardContent>
            )}
        </Card>
    );
}
