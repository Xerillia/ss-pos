import dayjs from "dayjs";

/**
 * Format date into YYYY-MM-DD HH:mm:ss format.
 *
 * ```
 * archive(1789623412) // 1970-01-22 00:07:03
 * ```
 */
export function archive(value: string | number | Date): string {
    return dayjs(new Date(value)).format("YYYY-MM-DD HH:mm:ss");
}

/**
 * Format date into YYYY-MM-DD format.
 *
 * ```
 * archive(1789623412) // 1970-01-22
 * ```
 */
export function ymd(value: string | number | Date): string {
    return dayjs(new Date(value)).format("YYYY-MM-DD");
}
