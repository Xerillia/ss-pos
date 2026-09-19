"use client";

import React, { useState } from "react";
import {
    useTable,
    type ColumnDef,
    type RowData,
    type SortingState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    features,
    type DataTableFeatures,
} from "../../lib/data-table-features";
import { router } from "@inertiajs/react";
import { showItem } from "@/routes/product";
import { Button } from "../ui/button";
import { getPageRange } from "@/lib/pagination";

interface DataTableProps<TData extends RowData> {
    columns: ColumnDef<DataTableFeatures, TData>[];
    data: TData[];
}

export function DataTable<TData extends RowData>({
    columns,
    data,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0, // 0-indexed internally by TanStack Table
        pageSize: 10,
    });

    const table = useTable({
        features,
        data,
        columns,
        onSortingChange: setSorting,
        state: {
            sorting,
            pagination,
        },
        onPaginationChange: setPagination,
    });

    // Calculate page parameters
    const currentPage = table.state.pagination.pageIndex + 1; // Convert to 1-indexed
    const totalPages = table.getPageCount();
    const pageRange = getPageRange(currentPage, totalPages, 1);

    const handleRowClick = (product: any) => {
        router.visit(showItem(product));
    };

    return (
        <>
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
                                    onClick={() => handleRowClick(row.original)}
                                    className="cursor-default select-none"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
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

            {/* Pagination Controls */}
            <div className="flex items-center justify-center space-x-2 py-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
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
                            className=" aspect-square"
                            onClick={() => table.setPageIndex(page - 1)} // convert back to 0-index
                        >
                            {page}
                        </Button>
                    );
                })}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </>
    );
}
