"use client";

import { useFormContext } from "react-hook-form";
import { Employee } from "../schema";
import { allowedCountries, departments } from "./options";
import { RHFEmailField, RHFSelectField, RHFTextField } from "@/components/rhf";
import RHFCurrencyField from "@/components/rhf/currency-field";

interface EmployeeFormProps {
  isSubmitting?: boolean;
  onSubmit?: (data: Employee) => void;
  existingEmployees?: Employee[];
}

export function EmployeeForm({ 
  onSubmit,
  existingEmployees = [] 
}: EmployeeFormProps) {
  const { handleSubmit } = useFormContext<Employee>();

  const formProps = onSubmit ? { onSubmit: handleSubmit(onSubmit) } : {};

  return (
    <form {...formProps} className="w-full max-w-2xl mx-auto space-y-6">
      {/* Información Personal */}
      <div className="bg-card border border-border rounded-lg p-6 w-full">
        <h3 className="font-semibold text-foreground mb-6">Información Personal</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="w-full">
            <RHFTextField
              name="name"
              label="Nombre"
              placeholder="Juan"
              required
              className="text-sm w-full space-y-2"
            />
          </div>
          <div className="w-full">
            <RHFTextField
              name="surname"
              label="Apellido"
              placeholder="Pérez"
              required
              className="text-sm w-full space-y-2"
            />
          </div>
        </div>

        <div className="w-full mt-6">
          <RHFEmailField
            name="emailCorporative"
            label="Email corporativo"
            placeholder="usuario@empresa.com"
            required
            existingEmployees={existingEmployees}
            className="text-sm w-full space-y-2"
          />
        </div>
      </div>

      {/* Información Laboral */}
      <div className="bg-card border border-border rounded-lg p-6 w-full">
        <h3 className="font-semibold text-foreground mb-6">Información Laboral</h3>
        
        <div className="w-full mb-6">
          <RHFSelectField
            name="departament"
            label="Departamento"
            options={departments}
            required
            className="text-sm w-full space-y-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="w-full">
            <RHFTextField
              name="dateOfAdmission"
              label="Fecha de ingreso"
              type="date"
              required
              className="text-sm w-full space-y-2"
            />
          </div>
          <div className="w-full">
            <RHFCurrencyField
              name="salary"
              label="Salario"
              step={100}
              min={800}
              max={10000}
              required
              className="text-sm w-full space-y-2"
            />
          </div>
        </div>
      </div>

      {/* Ubicación */}
      <div className="bg-card border border-border rounded-lg p-6 w-full">
        <h3 className="font-semibold text-foreground mb-6">Ubicación</h3>
        
        <div className="w-full">
          <RHFSelectField
            name="country"
            label="País"
            options={allowedCountries}
            required
            className="text-sm w-full space-y-2"
          />
        </div>
      </div>
    </form>
  );
}