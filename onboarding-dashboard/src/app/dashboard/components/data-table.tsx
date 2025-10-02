"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { withDndColumn } from "@/components/data-table/table-utils";
import { dashboardColumns } from "./columns";
import { employeeSchema } from "./schema";
import { AddEmployeeModal } from "./modals/create-employee";

type Employee = z.infer<typeof employeeSchema>;

export function DataTable({ data: initialData }: { data: Employee[] }) {
  const [data, setData] = React.useState<Employee[]>(() => initialData);
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">View</Label>
        <div className="flex items-center gap-2">
          <AddEmployeeModal onSubmit={(newEmployee) => setData([...data, { ...newEmployee, id: data.length + 1 }])}>
            <Button variant="outline" size="sm">
              <Plus />
              <span className="hidden lg:inline">Agregar Empleado</span>
            </Button>
          </AddEmployeeModal>
        </div>
      </div>

      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
    </Tabs>
  );
}
