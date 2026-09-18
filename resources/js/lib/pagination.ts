export function getPageRange(
    currentPage: number, // 1-index
    totalPages: number,
    siblingCount = 1,
): (number | "ellipsis")[] {
    const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
    const totalBlocks = totalNumbers + 2; // + 2 for ellipses

    if (totalPages <= totalBlocks) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = Array.from(
            { length: leftItemCount },
            (_, i) => i + 1,
        );
        return [...leftRange, "ellipsis", totalPages];
    }

    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = Array.from(
            { length: rightItemCount },
            (_, i) => totalPages - rightItemCount + i + 1,
        );
        return [1, "ellipsis", ...rightRange];
    }

    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        const middleRange = Array.from(
            { length: rightSiblingIndex - leftSiblingIndex + 1 },
            (_, i) => leftSiblingIndex + i,
        );
        return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
    }

    return [];
}
