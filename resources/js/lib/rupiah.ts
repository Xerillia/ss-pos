/**
 * Format number into Indonesian currency.
 *
 * ```
 * rupiah(52000) // Rp 52.000
 * ```
 */
export function rupiah(value: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 2,
    }).format(value);
}
