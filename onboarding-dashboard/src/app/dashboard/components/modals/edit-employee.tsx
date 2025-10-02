"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Employee, employeeSchema } from "../schema";

type EmployeeForm = Omit<Employee, "id">;

interface AddEditEmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeData: Employee;
  onSubmit: (data: EmployeeForm) => void;
}

export function AddEditEmployeeModal({
  open,
  onOpenChange,
  employeeData,
  onSubmit,
}: AddEditEmployeeModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema.omit({ id: true })),
    defaultValues: {
      name: employeeData.name,
      surname: employeeData.surname,
      emailCorporative: employeeData.emailCorporative,
      departament: employeeData.departament,
      dateOfAdmission: employeeData.dateOfAdmission,
      salary: employeeData.salary,
      country: employeeData.country,
    },
  });

  React.useEffect(() => {
    reset(employeeData);
  }, [employeeData, reset]);

  const countries = React.useMemo(() => countryList().getData(), []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Editar Empleado</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <Label>Nombre</Label>
            <Input {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <Label>Apellido</Label>
            <Input {...register("surname")} />
            {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
          </div>

          <div>
            <Label>Email corporativo</Label>
            <Input {...register("emailCorporative")} />
            {errors.emailCorporative && (
              <p className="text-red-500 text-sm">{errors.emailCorporative.message}</p>
            )}
          </div>

          <div>
            <Label>Departamento</Label>
            <Input {...register("departament")} />
            {errors.departament && (
              <p className="text-red-500 text-sm">{errors.departament.message}</p>
            )}
          </div>

          <div>
            <Label>Fecha de ingreso</Label>
            <Input type="date" {...register("dateOfAdmission")} />
            {errors.dateOfAdmission && (
              <p className="text-red-500 text-sm">{errors.dateOfAdmission.message}</p>
            )}
          </div>

          <div>
            <Label>Salario</Label>
            <Input type="number" {...register("salary", { valueAsNumber: true })} />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>

          <div>
            <Label>País</Label>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select
                  {...field}
                  options={countries}
                  onChange={(val) => field.onChange(val?.value)}
                  value={countries.find((c) => c.value === field.value) || null}
                  isClearable
                />
              )}
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>

          <DialogFooter className="pt-2 flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Actualizar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
