import { Link } from "@inertiajs/react";
import { ButtonGroup } from "../ui/button-group";
import { buttonVariants } from "../ui/button";
import { editItem } from "@/routes/product";
import { Product } from "@/types/product";
import DeleteDialog from "./delete-dialog";
import { Pencil } from "lucide-react";

interface ItemActionProps {
    product: Product;
}

export default function ItemAction({ product }: ItemActionProps) {
    return (
        <ButtonGroup>
            <Link
                href={editItem(product)}
                className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                })}
            >
                <Pencil /> Edit
            </Link>
            <DeleteDialog product={product} />
        </ButtonGroup>
    );
}
