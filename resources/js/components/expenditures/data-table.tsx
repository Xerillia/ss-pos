"use client";

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
import { useState } from "react";
import { LaravelPaginationProps } from "@/types/laravel-pagination-props";
import { router } from "@inertiajs/react";
import { expenditures } from "@/routes/expenditure";
import Pagination from "../pagination";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState(filters.search || "");

    const currentPage = pagination.current_page;
    const lastPage = pagination.last_page;

    const table = useTable({
        features,
        data: pagination.data,
        columns,
        manualPagination: true,
        onSortingChange: setSorting,
        pageCount: pagination.last_page,
        state: {
            sorting,
            pagination: {
                pageIndex: currentPage - 1,
                pageSize: pagination.per_page,
            },
        },
    });

    const handleSearchSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        router.get(
            expenditures(),
            { search, per_page: filters.per_page },
            { preserveState: true },
        );
    };

    const handlePageChange = (pageIndex: number) => {
        const targetPage = pageIndex + 1;
        router.get(
            expenditures(),
            { search, per_page: filters.per_page, page: targetPage },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 max-w-md"
            >
                <Input
                    placeholder="Search title, expense number, or reference number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit" variant="secondary">
                    Search
                </Button>
            </form>

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

                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
