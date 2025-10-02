"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import Select from "react-select";
import countryList from "react-select-country-list";
import { employeeSchema } from "../schema";


type EmployeeFormData = z.infer<typeof employeeSchema>;
type CountryOption = { value: string; label: string };

interface AddEmployeeModalProps {
  onSubmit: (data: EmployeeFormData) => void;
  children?: React.ReactNode;
}

export function AddEmployeeModal({ onSubmit, children }: AddEmployeeModalProps) {
  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      surname: "",
      emailCorporative: "",
      dateOfAdmission: "",
      departament: "",
      salary: 800,
      country: "",
    },
  });

  const countries: CountryOption[] = React.useMemo(() => countryList().getData(), []);

  const submitHandler = (values: EmployeeFormData) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? <Button variant="outline">Agregar Empleado</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Agregar Empleado</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(submitHandler)} className="grid gap-4 py-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Nombre</Label>
              <Input placeholder="Juan" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div>
              <Label>Apellido</Label>
              <Input placeholder="Pérez" {...form.register("surname")} />
              {form.formState.errors.surname && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.surname.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <Label>Email corporativo</Label>
            <Input
              type="email"
              placeholder="nombre@empresa.com"
              {...form.register("emailCorporative")}
            />
            {form.formState.errors.emailCorporative && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.emailCorporative.message}
              </p>
            )}
          </div>
          
          <div>
            <Label>Departamento</Label>
            <Input placeholder="Marketing" {...form.register("departament")} />
            {form.formState.errors.departament && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.departament.message}
              </p>
            )}
          </div>


          {/* Fecha de ingreso y Salario */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Fecha de ingreso</Label>
              <Input type="date" {...form.register("dateOfAdmission")} />
              {form.formState.errors.dateOfAdmission && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.dateOfAdmission.message}
                </p>
              )}
            </div>
            <div>
              <Label>Salario</Label>
              <Input type="number" step="100" min="800" max="10000" {...form.register("salary")} />
              {form.formState.errors.salary && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.salary.message}</p>
              )}
            </div>
          </div>

          {/* País con react-select */}
          <div>
            <Label>País</Label>
            <Controller
              control={form.control}
              name="country"
              render={({ field }) => (
                <Select
                  {...field}
                  options={countries}
                  placeholder="Escribe para buscar..."
                  onChange={(val: CountryOption | null) => field.onChange(val?.value)}
                  value={countries.find((c: CountryOption) => c.value === field.value) || null}
                  isClearable
                />
              )}
            />
            {form.formState.errors.country && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.country.message}</p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" className="w-full sm:w-auto">
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
