"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/app/dashboard/hooks/data-employee";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table/data-column-header";
import { ActionsCell } from "@/components/ui/action-cells";

export const dashboardColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.name}
        </Badge>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "surname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.surname}
      </Badge>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "emailCorporative",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Corporativo" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.emailCorporative}</span>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "departament",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Departamento" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.departament}</span>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "dateOfAdmission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de Ingreso" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.dateOfAdmission}</span>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="País" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.country}</span>
    ),
    enableSorting: false,
    enableHiding: true,
  },
{
  accessorKey: "salary",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Salario" />,
  cell: ({ row }) => <span className="text-muted-foreground">${row.original.salary}</span>,
  enableSorting: true, 
  enableHiding: true,
},
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell employee={row.original} />,
    enableSorting: false,
  },
];