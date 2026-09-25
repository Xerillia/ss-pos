import { PaymentStatus } from "@/enums";
import { VariantProps } from "class-variance-authority";
import { styleVariants } from "./style";

export const statusVariantMap: Record<
    PaymentStatus,
    VariantProps<typeof styleVariants>["variant"]
> = {
    [PaymentStatus.PAID]: "green",
    [PaymentStatus.PARTIAL]: "yellow",
    [PaymentStatus.PARTIALLY_REFUNDED]: "yellow",
    [PaymentStatus.UNPAID]: "red",
};
