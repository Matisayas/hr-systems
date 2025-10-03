"use client";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Employee } from "../schema";

// Opciones de selects
export const allowedCountries = [
  { value: "El Salvador", label: "El Salvador" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Honduras", label: "Honduras" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Panamá", label: "Panamá" },
];

export const departments = [
  { value: "Engineering", label: "Engineering" },
  { value: "Sales", label: "Sales" },
  { value: "HR", label: "HR" },
  { value: "Operations", label: "Operations" },
];

interface EmployeeFormProps {
  isSubmitting?: boolean;
  onSubmit: (data: Employee) => void;
}

export function EmployeeForm({ isSubmitting = false, onSubmit }: EmployeeFormProps) {
  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useFormContext<Employee>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input 
            id="name"
            placeholder="Juan" 
            {...register("name")} 
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="surname">Apellido</Label>
          <Input 
            id="surname"
            placeholder="Pérez" 
            {...register("surname")} 
          />
          {errors.surname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.surname.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="emailCorporative">Email corporativo</Label>
        <Input 
          id="emailCorporative"
          type="email" 
          placeholder="usuario@empresa.com"
          {...register("emailCorporative")} 
        />
        {errors.emailCorporative && (
          <p className="text-red-500 text-sm mt-1">
            {errors.emailCorporative.message}
          </p>
        )}
      </div>

      {/* Departamento */}
      <div>
        <Label htmlFor="departament">Departamento</Label>
        <Controller
          control={control}
          name="departament"
          render={({ field }) => (
            <Select
              {...field}
              inputId="departament"
              options={departments}
              onChange={(val) => field.onChange(val?.value)}
              value={departments.find((d) => d.value === field.value) || null}
            />
          )}
        />
        {errors.departament && (
          <p className="text-red-500 text-sm mt-1">
            {errors.departament.message}
          </p>
        )}
      </div>

      {/* Fecha y Salario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dateOfAdmission">Fecha de ingreso</Label>
          <Input 
            id="dateOfAdmission"
            type="date" 
            {...register("dateOfAdmission")} 
          />
          {errors.dateOfAdmission && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateOfAdmission.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="salary">Salario</Label>
          <Input 
            id="salary"
            type="number" 
            step={100} 
            min={800} 
            max={10000} 
            {...register("salary", { valueAsNumber: true })} 
          />
          {errors.salary && (
            <p className="text-red-500 text-sm mt-1">
              {errors.salary.message}
            </p>
          )}
        </div>
      </div>

      {/* País */}
      <div>
        <Label htmlFor="country">País</Label>
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <Select
              {...field}
              inputId="country"
              options={allowedCountries}
              onChange={(val) => field.onChange(val?.value)}
              value={allowedCountries.find((c) => c.value === field.value) || null}
            />
          )}
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">
            {errors.country.message}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}