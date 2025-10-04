"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
  PaginationState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TanStackTable,
} from "@tanstack/react-table";

/**
 * Props para inicializar la instancia de la tabla.
 */
export type UseDataTableInstanceProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[]; // columnas definidas con tanstack
  enableRowSelection?: boolean;
  defaultPageIndex?: number;
  defaultPageSize?: number;
  getRowId?: (row: TData, index: number) => string;
};

/**
 * Hook para crear una tabla de datos tipada con @tanstack/react-table.
 */
export function useDataTableInstance<TData>({
  data,
  columns,
  enableRowSelection = true,
  defaultPageIndex,
  defaultPageSize,
  getRowId,
}: UseDataTableInstanceProps<TData>): TanStackTable<TData> {
  // Estado de selección de filas
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  // Estado de visibilidad de columnas
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  // Estado de filtros
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  // Estado de ordenamiento
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // Estado de paginación
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: defaultPageIndex ?? 0,
    pageSize: defaultPageSize ?? 10,
  });

  // Instancia tipada de la tabla
  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection,
    getRowId:
      getRowId ??
      ((row, index) =>
        (row as { id?: string | number })?.id?.toString() ?? String(index)),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return table;
}
