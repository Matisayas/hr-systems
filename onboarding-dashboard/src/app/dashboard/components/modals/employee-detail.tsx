"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Employee } from "@/app/dashboard/hooks/data-employee";

interface EmployeeDetailModalProps {
  employee: Employee | null;
  open: boolean;
  onClose: () => void;
  onEdit?: () => void;
}

export function EmployeeDetailModal({
  employee,
  open,
  onClose,
  onEdit,
}: EmployeeDetailModalProps) {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>
            {employee.name} {employee.surname}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-2 py-2">
          <p>
            <strong>Email:</strong> {employee.emailCorporative}
          </p>
          <p>
            <strong>Departamento:</strong> {employee.departament}
          </p>
          <p>
            <strong>País:</strong> {employee.country}
          </p>
          <p>
            <strong>Salario:</strong> ${employee.salary}
          </p>
          <p>
            <strong>Fecha de ingreso:</strong> {employee.dateOfAdmission}
          </p>
        </div>

        <DialogFooter className="flex justify-between">
          <Button onClick={onClose}>Cerrar</Button>
          <Button
            onClick={() => {
              onClose();
              onEdit?.(); // abre el modal de edición
            }}
          >
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
