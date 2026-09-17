import dayjs from "dayjs";

/**
 * Format timestamp into YYYY-MM-DD HH:mm:ss format.
 *
 * ```
 * archive(1789623412) // 1970-01-22 00:07:03
 * ```
 */
export function archive(value: string | number): string {
    const date = new Date(value);
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
