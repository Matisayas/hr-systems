"use client";

import { Dialog } from "@/components/ui/dialog";
import { Employee, EmployeeFormData } from "../schema";
import { useEmployeeModal } from "./hooks/use-employee-modal";
import { EmployeeModalContent } from "./employee-modal-content";

interface AddEditEmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeData: Employee;
  onSubmit: (data: EmployeeFormData) => void;
  existingEmployees?: Employee[];
}

export function AddEditEmployeeModal({
  open,
  onOpenChange,
  employeeData,
  onSubmit,
  existingEmployees = [],
}: AddEditEmployeeModalProps) {
  const {
    methods,
    handleFormSubmit,
    handleCancel,
    isEditing,
    isSubmitting,
  } = useEmployeeModal({
    employeeData,
    onSubmit: (data: EmployeeFormData) => {
      onSubmit(data);
      onOpenChange(false);
    },
    existingEmployees,
  });

  const handleClose = () => {
    handleCancel();
    onOpenChange(false);
  };

  const title = isEditing ? "Editar Empleado" : "Agregar Empleado";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <EmployeeModalContent
        title={title}
        methods={methods}
        onSubmit={handleFormSubmit}
        onCancel={handleClose}
        isSubmitting={isSubmitting}
        existingEmployees={existingEmployees}
      />
    </Dialog>
  );
}