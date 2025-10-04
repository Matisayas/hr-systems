"use client";

import { Employee, employeeSchema } from "@/app/employees/components/schema";
import { useEmployees } from "@/contexts/employee-context";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { EmployeeForm } from "../components/form/employee-form";
import { FooterButtons } from "@/components/ui/footer-button";
import { useEffect, useState } from "react";

// Componente Container
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-6">
      {children}
    </div>
  );
}

// Función para verificar si el email ya existe (simulando API)
async function checkEmailExists(email: string, existingEmployees: Employee[]): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const emailExists = existingEmployees.some((e) => 
        e.emailCorporative.toLowerCase() === email.toLowerCase()
      );
      resolve(emailExists);
    }, 500); // Simular delay de API
  });
}

// Función para simular creación de empleado
async function addEmployee(employee: Employee): Promise<Employee> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEmp: Employee = { 
        ...employee, 
        id: Date.now() 
      };
      resolve(newEmp);
    }, 800);
  });
}

const defaultValues: Employee = { 
  name: "",
  surname: "",
  emailCorporative: "",
  departament: "HR",
  dateOfAdmission: "",
  salary: 800,
  country: "El Salvador",
};

export default function CreateEmployeePage() {
  const { employees, addEmployee: addEmployeeToContext } = useEmployees();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const form = useForm<Employee>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
    mode: "onChange",
  });

  const { isDirty, isValid } = form.formState;

  // Marcar que estamos en el cliente y recuperar draft
  useEffect(() => {
    setIsClient(true);
    
    // Recuperar draft del localStorage
    const draft = localStorage.getItem("employeeDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        form.reset(parsedDraft);
      } catch {
        localStorage.removeItem("employeeDraft");
      }
    }
  }, [form]);

// Guardar draft una vez después de 30 segundos de cambios
useEffect(() => {
  if (!isClient || !isDirty) return;

  const timeout = setTimeout(() => {
    const values = form.getValues();
    localStorage.setItem("employeeDraft", JSON.stringify(values));
    toast.info("📄 Trabajo guardado en la papelera");
  }, 30000);

  return () => clearTimeout(timeout);
}, [form, isDirty, isClient]);


  const handleFormSubmit = async (values: Employee) => {
    setIsSubmitting(true);
    
    try {
      // Verificar contra los empleados existentes
      const emailExists = await checkEmailExists(values.emailCorporative, employees);
      if (emailExists) {
        toast.error("El email ya está registrado en el sistema");
        setIsSubmitting(false);
        return;
      }

      // Simular la creación del empleado
      const newEmployee = await addEmployee(values);
      
      toast.success("Empleado creado con éxito");
      
      // Esperar un poco para mostrar el toast
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Limpiar y redirigir
      localStorage.removeItem("employeeDraft");
      form.reset(defaultValues);
      
      // Agregar al contexto
      addEmployeeToContext(newEmployee);
      
      // Redirigir a la lista
      router.push("/employees");
      
    } catch {
      toast.error("Error al crear el empleado");
    } finally {
      setIsSubmitting(false);
    }
  };

 const handleCancel = () => {
  if (isDirty) {
    const values = form.getValues();
    localStorage.setItem("employeeDraft", JSON.stringify(values));
    toast.info("Draft guardado automáticamente"); 
  }
  
  // Redirigir inmediatamente
  router.push("/employees/list");
};

  if (!isClient) {
    return (
      <Container>
        <div className="flex flex-col gap-6">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold">Agregar Empleado</h1>
          </div>
          <div className="text-center py-8">Cargando formulario...</div>
        </div>
      </Container>
    );
  }

  return (
    <FormProvider {...form}>
      <Container>
        <div className="flex flex-col gap-6">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold">Agregar Empleado</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Los cambios se guardan automáticamente cada 30 segundos
            </p>
          </div>
          
          <EmployeeForm 
            isSubmitting={isSubmitting}
            onSubmit={handleFormSubmit}
            existingEmployees={employees}
          />
          
          <FooterButtons
            loading={isSubmitting}
            onPrimaryClick={form.handleSubmit(handleFormSubmit)}
            onSecondaryClick={handleCancel}
            secondaryLinkTo="/employees/list"
            primaryLabel={isSubmitting ? "Creando empleado..." : "Crear empleado"}
            primaryDisabled={!isValid || isSubmitting}
          />
        </div>
      </Container>
    </FormProvider>
  );
}