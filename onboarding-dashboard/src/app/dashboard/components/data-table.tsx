"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { withDndColumn } from "@/components/data-table/table-utils";
import { dashboardColumns } from "./columns";
import { Employee } from "./schema";
import { AddEmployeeModal } from "./modals/create-employee";
import { ToastContainer } from "react-toastify";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { useEmployees } from "@/contexts/employee-context";

export function DataTable() {
  const { employees, addEmployee } = useEmployees();
  

  const columns = withDndColumn(dashboardColumns);
  
  const table = useDataTableInstance({
    data: employees,
    columns,
    getRowId: (row) => (row.id ? row.id.toString() : `temp-${row.name}-${row.emailCorporative}`)
  });

  const handleAddEmployee = (newEmployee: Employee) => {
    addEmployee(newEmployee);
  };

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
        <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
          <div className="overflow-hidden rounded-lg border">
            <DataTableNew 
              dndEnabled 
              table={table} 
              columns={columns} 
              onReorder={() => {}} 
            />
          </div>
          <DataTablePagination table={table} />
        </TabsContent>
      </Tabs>
    </>
  );
}