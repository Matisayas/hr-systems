"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { EmployeeForm } from "../form/employee-form";
import { Employee, EmployeeFormData } from "../schema";

interface EmployeeModalContentProps {
  title: string;
  methods: UseFormReturn<EmployeeFormData>;
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  existingEmployees?: Employee[];
}

export function EmployeeModalContent({
  title,
  methods,
  onSubmit,
  onCancel,
  isSubmitting,
  existingEmployees = [],
}: EmployeeModalContentProps) {
  const handleSubmit = () => {
    methods.handleSubmit(onSubmit)();
  };

  return (
    <DialogContent className="sm:max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      <FormProvider {...methods}>
        <EmployeeForm
          onSubmit={onSubmit}
          existingEmployees={existingEmployees}
        />
        
        <DialogFooter className="pt-2 flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? ( "Guardando..." ) : ( "Guardar" )
            }
          </Button>
        </DialogFooter>
      </FormProvider>
    </DialogContent>
  );
}