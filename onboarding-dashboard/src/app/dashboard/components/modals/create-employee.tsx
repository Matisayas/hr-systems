"use client";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Employee, employeeSchema } from "../schema";
import { EmployeeForm } from "../form/employee-form";
import { toast } from "sonner";

// Importa o pasa los empleados existentes como prop
type Props = {
  onSubmit: (employee: Employee) => void;
  children: React.ReactNode;
  existingEmployees?: Employee[]; // Nueva prop para los empleados existentes
};

// Función para verificar si el email ya existe
async function checkEmailExists(email: string, existingEmployees: Employee[]): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Verifica contra la lista real de empleados
      const emailExists = existingEmployees.some((e) => 
        e.emailCorporative.toLowerCase() === email.toLowerCase()
      );
      resolve(emailExists);
    }, 100);
  });
}

// Función mock para agregar empleado (solo para simulación)
async function addEmployee(employee: Employee): Promise<Employee> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEmp = { 
        ...employee, 
        id: Date.now() 
      };
      resolve(newEmp);
    }, 800);
  });
}

const defaultValues: Partial<Employee> = {
  name: "",
  surname: "",
  emailCorporative: "",
  departament: "HR",
  dateOfAdmission: "",
  salary: 800,
  country: "El Salvador",
};

export function AddEmployeeModal({ onSubmit, children, existingEmployees = [] }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<Employee>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
    mode: "onChange",
  });

  const { isDirty } = form.formState;

  // Recuperar draft al abrir el modal
  React.useEffect(() => {
    if (isOpen) {
      const draft = localStorage.getItem("employeeDraft");
      if (draft) {
        try {
          const parsedDraft = JSON.parse(draft);
          form.reset(parsedDraft);
        } catch (error) {
          console.error("Error parsing draft:", error);
          localStorage.removeItem("employeeDraft");
        }
      }
    }
  }, [isOpen, form]);

  // Guardar draft cada 30s
  React.useEffect(() => {
    if (!isDirty) return;

    const interval = setInterval(() => {
      const values = form.getValues();
      localStorage.setItem("employeeDraft", JSON.stringify(values));
    }, 30000);

    return () => clearInterval(interval);
  }, [form, isDirty]);

  const handleFormSubmit = async (values: Employee) => {
    setIsSubmitting(true);
    
    try {
      // Verificar contra los empleados existentes
      const emailExists = await checkEmailExists(values.emailCorporative, existingEmployees);
      if (emailExists) {
        toast.error("El email ya está registrado en el sistema");
        setIsSubmitting(false);
        return;
      }

      // Simular la creación del empleado
      const newEmployee = await addEmployee(values);
      
      toast.success("Empleado creado con éxito");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Limpiar y cerrar
      localStorage.removeItem("employeeDraft");
      form.reset(defaultValues);
      setIsOpen(false);
      
      // Llamar al callback del padre
      onSubmit(newEmployee);
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al crear el empleado");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset(defaultValues);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg w-full" aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Agregar Empleado</DialogTitle>
          <p id="dialog-description" className="sr-only">
            Formulario para agregar un nuevo empleado al sistema
          </p>
        </DialogHeader>
        
        <FormProvider {...form}>
          <EmployeeForm 
            isSubmitting={isSubmitting}
            onSubmit={handleFormSubmit}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}