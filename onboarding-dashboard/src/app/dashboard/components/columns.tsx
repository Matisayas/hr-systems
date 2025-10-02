"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { useRouter } from "next/navigation";
import { employeeSchema } from "./schema";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table/data-column-header";

export const dashboardColumns: ColumnDef<z.infer<typeof employeeSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.name}
        </Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "surname",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Apellido" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.surname}
      </Badge>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "emailCorporative",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email Corporativo" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.emailCorporative}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "departament",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.departament ?? "N/A"}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dateOfAdmission",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de Ingreso" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.dateOfAdmission}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "country",
    header: ({ column }) => <DataTableColumnHeader column={column} title="País" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.country}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "salary",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Salario" />,
    cell: ({ row }) => <span className="text-muted-foreground">${row.original.salary}</span>,
    enableSorting: false,
    enableHiding: false,
  },
{
  id: "actions",
  cell: ({ row }) => {
    const employee = row.original;
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();

    return (
      <>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <EllipsisVertical />
        </Button>
      </>
    );
  },
  enableSorting: false,
}


];
