import { RefreshCw } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useCartContext } from "./cart-context";

export default function ClearCartButton() {
    const { clearCart } = useCartContext();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="xs">
                    <RefreshCw />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    Are you sure to clear the cart?
                </AlertDialogHeader>
                <AlertDialogDescription>
                    This action cannot be undone. This will clear the current
                    cart.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="default">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        onClick={() => clearCart()}
                    >
                        Clear
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
