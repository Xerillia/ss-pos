import { cva } from "class-variance-authority";

const styleVariants = cva("", {
    variants: {
        variant: {
            green: "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
            yellow: "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
            red: "border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300",
        },
    },
});

export { styleVariants };
