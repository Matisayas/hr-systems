"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { withDndColumn } from "@/components/data-table/table-utils";
import { dashboardColumns } from "./columns";
import { employeeSchema } from "./schema";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

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
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
