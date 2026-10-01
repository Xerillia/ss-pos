/**
 * Format a number to 2 decimal places.
 *
 * ```
 * formatNumber(24.00) // 24
 * formatNumber(27.35) // 27.35
 * formatNumber(27.30) // 27.3
 * ```
 */
export function formatNumber(num: number): number {
    if (num === null || num === undefined || isNaN(num)) {
        return 0;
    }
    return Number(Number(num).toFixed(2));
}
