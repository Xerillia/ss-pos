import { DataTableFeatures, features } from "@/lib/data-table-features";
import { router } from "@inertiajs/react";
import {
    ColumnDef,
    RowData,
    useTable,
    coreRowModelsFeature,
    flexRender,
} from "@tanstack/react-table";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { getPageRange } from "@/lib/pagination";

interface LaravelPaginationProps<TData> {
    data: TData[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface DataTableProps<TData extends RowData> {
    columns: ColumnDef<DataTableFeatures, TData>[];
    pagination: LaravelPaginationProps<TData>;
    filters: { search: string; per_page: number };
}

export function DataTable<TData extends RowData>({
    columns,
    pagination,
    filters,
}: DataTableProps<TData>) {
    const [search, setSearch] = React.useState(filters.search || "");
    const [rowSelection, setRowSelection] = React.useState({});

    const currentPage = pagination.current_page;
    const lastPage = pagination.last_page;

    const table = useTable({
        features,
        data: pagination.data,
        columns,
        manualPagination: true,
        pageCount: pagination.last_page,
        state: {
            rowSelection,
            pagination: {
                pageIndex: currentPage - 1,
                pageSize: pagination.per_page,
            },
        },
        onRowSelectionChange: setRowSelection,
    });

    const handleSearchSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        router.get(
            "/sales",
            { search, per_page: filters.per_page },
            { preserveState: true },
        );
    };

    const handlePageChange = (pageIndex: number) => {
        const targetPage = pageIndex + 1;
        router.get(
            "/sales",
            { search, per_page: filters.per_page, page: targetPage },
            { preserveState: true },
        );
    };

    const pageRange = getPageRange(currentPage, lastPage);

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 max-w-sm"
            >
                <Input
                    placeholder="Search sale # or customer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit" variant="secondary">
                    Search
                </Button>
            </form>

            {/* Table Component */}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-center"
                                        >
                                            {header.isPlaceholder ? null : (
                                                <table.FlexRender
                                                    header={header}
                                                />
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-center"
                                        >
                                            <table.FlexRender cell={cell} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-center space-x-2 py-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 2)}
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
                            variant={
                                currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            className="aspect-square"
                            onClick={() => handlePageChange(page - 1)}
                        >
                            {page}
                        </Button>
                    );
                })}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage)}
                    disabled={currentPage >= lastPage}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
