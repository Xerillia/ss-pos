import { getPageRange } from "@/lib/pagination";
import { Button } from "./ui/button";

export interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (pageIndex: number) => void;
    className?: string;
}

export default function Pagination({
    currentPage,
    lastPage,
    onPageChange,
    className = "",
}: PaginationProps) {
    const pageRange = getPageRange(currentPage, lastPage);

    return (
        <div
            className={`flex items-center justify-center space-x-2 py-2 ${className}`}
        >
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 2)}
                disabled={currentPage <= 1}
            >
                Previous
            </Button>

            {pageRange.map((page, index) => {
                if (page === "ellipsis") {
                    return <span key={`ellipsis-${index}`}>...</span>;
                }

                return (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className="aspect-square"
                        onClick={() => onPageChange(page - 1)}
                    >
                        {page}
                    </Button>
                );
            })}

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage)}
                disabled={currentPage >= lastPage}
            >
                Next
            </Button>
        </div>
    );
}
