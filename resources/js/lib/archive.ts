import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

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
 * ymd(1789623412) // 1970-01-22
 * ```
 */
export function ymd(value: string | number | Date): string {
    return dayjs(new Date(value)).format("YYYY-MM-DD");
}

/**
 * Converts a UTC date into a local time "YYYY-MM-DDTHH:mm:ss"
 */
export const utcToLocalIso = (date?: string | Date | null): string => {
    if (!date) return dayjs().format("YYYY-MM-DDTHH:mm:ss");

    return dayjs.utc(date).local().format("YYYY-MM-DDTHH:mm:ss");
};

/**
 * Converts a local time into a UTC "YYYY-MM-DD HH:mm:ss".
 */
export const localToUtcIso = (date: string | Date): string | null => {
    if (!date) return null;

    return dayjs(new Date(date)).utc().format("YYYY-MM-DD HH:mm:ss");
};
