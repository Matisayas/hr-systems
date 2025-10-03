"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { ToastContainer } from "react-toastify";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { useEmployees } from "@/contexts/employee-context";
import { MultiSelectFilter } from "./multi-select-filter";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState, useMemo } from "react";
import { AddEmployeeModal } from "@/app/dashboard/components/modals/create-employee";
import { dashboardColumns } from "@/app/dashboard/components/columns";
import { Country, Department } from "@/app/dashboard/hooks/data-employee";
import { Employee } from "@/app/dashboard/components/schema";
import { ColumnDef, flexRender, type Table as TanStackTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Componente DataTable interno SIMPLIFICADO
interface DataTableProps<TData, TValue> {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
}

function DataTable<TData, TValue>({
  table,
  columns,
}: DataTableProps<TData, TValue>) {
  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="**:data-[slot=table-cell]:first:w-8">
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

// Componente principal EmployeeTable
export function EmployeeTable() {
  const { employees, addEmployee } = useEmployees();
  
  // Estado para filtros
  const [departmentFilter, setDepartmentFilter] = useState<Department[]>([]);
  const [countryFilter, setCountryFilter] = useState<Country[]>([]);

  // Obtener opciones únicas para los filtros
  const departmentOptions = useMemo(() => 
    Array.from(new Set(employees.map(emp => emp.departament))), 
    [employees]
  );

  const countryOptions = useMemo(() => 
    Array.from(new Set(employees.map(emp => emp.country))), 
    [employees]
  );

  // Filtrar datos
  const filteredData = useMemo(() => {
    return employees.filter(employee => {
      const departmentMatch = departmentFilter.length === 0 || 
        departmentFilter.includes(employee.departament);
      
      const countryMatch = countryFilter.length === 0 || 
        countryFilter.includes(employee.country);
      
      return departmentMatch && countryMatch;
    });
  }, [employees, departmentFilter, countryFilter]);

  const columns = dashboardColumns;
  
  const table = useDataTableInstance({
    data: filteredData, 
    columns,
    getRowId: (row) => (row.id ? row.id.toString() : `temp-${row.name}-${row.emailCorporative}`)
  });

  const handleAddEmployee = (newEmployee: Employee) => {
    addEmployee(newEmployee);
  };

  const clearAllFilters = () => {
    setDepartmentFilter([]);
    setCountryFilter([]);
  };

  const removeDepartmentFilter = (dept: Department) => {
    setDepartmentFilter(prev => prev.filter(d => d !== dept));
  };

  const removeCountryFilter = (country: Country) => {
    setCountryFilter(prev => prev.filter(c => c !== country));
  };

  const hasActiveFilters = departmentFilter.length > 0 || countryFilter.length > 0;

  return (
    <>
      <ToastContainer />
      <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="view-selector" className="sr-only">View</Label>
          <div className="flex items-center gap-2">
            <AddEmployeeModal 
              onSubmit={handleAddEmployee}
              existingEmployees={employees}
            >
              <Button variant="outline" size="sm">
                <Plus />
                <span className="hidden lg:inline">Agregar Empleado</span>
              </Button>
            </AddEmployeeModal>
          </div>
        </div>

        {/* SECCIÓN DE FILTROS */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            <MultiSelectFilter
              title="Departamento"
              options={departmentOptions}
              selectedValues={departmentFilter}
              onValueChange={setDepartmentFilter as (values: string[]) => void}
            />
            <MultiSelectFilter
              title="País"
              options={countryOptions}
              selectedValues={countryFilter}
              onValueChange={setCountryFilter as (values: string[]) => void}
            />
            
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearAllFilters}>
                Limpiar todos
              </Button>
            )}
          </div>

          {/* Badges para mostrar filtros activos */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Filtros activos:</span>
              {departmentFilter.map(dept => (
                <Badge key={dept} variant="secondary" className="flex items-center gap-1">
                  Departamento: {dept}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeDepartmentFilter(dept)}
                  />
                </Badge>
              ))}
              {countryFilter.map(country => (
                <Badge key={country} variant="secondary" className="flex items-center gap-1">
                  País: {country}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeCountryFilter(country)}
                  />
                </Badge>
              ))}
            </div>
          )}

          {/* Información de resultados */}
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredData.length} de {employees.length} empleados
            {hasActiveFilters && " (filtrados)"}
          </div>
        </div>

        <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
          <div className="overflow-hidden rounded-lg border">
            <DataTable 
              table={table} 
              columns={columns}
            />
          </div>
          <DataTablePagination table={table} />
        </TabsContent>
      </Tabs>
    </>
  );
}