"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { withDndColumn } from "@/components/data-table/table-utils";
import { dashboardColumns } from "./columns";
import { Employee, employeeSchema } from "./schema";
import { AddEmployeeModal } from "./modals/create-employee";
import { ToastContainer } from "react-toastify";



export function DataTable({ data: initialData }: { data: Employee[] }) {
  const [data, setData] = React.useState<Employee[]>(() => initialData);
  const columns = withDndColumn(dashboardColumns);
  
  const table = useDataTableInstance({
    data,
    columns,
    getRowId: (row) => (row.id || Date.now() + Math.random()).toString()
  });

  const handleAddEmployee = (newEmployee: Employee) => {
    setData(prev => [...prev, { ...newEmployee, id: newEmployee.id || Date.now() }]);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="view-selector" className="sr-only">
            View
          </Label>
          <div className="flex items-center gap-2">
            <AddEmployeeModal onSubmit={handleAddEmployee}>
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
    </>
  );
}