"use client";

import { useRouter } from "next/navigation";
import { EllipsisVertical, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/data-table/dropdown-menu";
import { Employee } from "@/app/dashboard/components/schema";

interface ActionsCellProps {
  employee: Employee;
}

export function ActionsCell({ employee }: ActionsCellProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    // Redirige a la página de detalle del empleado
    router.push(`/dashboard/employees/${employee.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={handleViewDetails}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Info size={16} />
          Info
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}