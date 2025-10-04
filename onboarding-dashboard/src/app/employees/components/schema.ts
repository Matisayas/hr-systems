export type Department = "HR" | "Engineering" | "Sales" | "Operations";
export type Country = "El Salvador" | "Guatemala" | "Honduras" | "Costa Rica" | "Panamá";

export interface Employee {
  id?: number;
  name: string;
  surname: string;
  emailCorporative: string;
  salary: number;
  country: Country;
  departament: Department;
  dateOfAdmission: string;
}

// Tipo para formularios (sin id opcional)
export interface EmployeeFormData extends Omit<Employee, "id"> {}

// Tipo para actualizar empleado (id requerido)
export interface UpdateEmployee extends Omit<Employee, "id"> {
  id: number;
}

// Tipo para crear empleado (id opcional)
export interface CreateEmployee extends Omit<Employee, "id"> {
  id?: number;
}

// Schema de validación Zod (actualizado con tus tipos)
import { z } from "zod";

export const employeeSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  surname: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
  emailCorporative: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido")
    .refine((val: string) => val.endsWith("@empresa.com"), {
      message: "El email debe terminar en @empresa.com",
    }),
  departament: z.enum(["HR", "Engineering", "Sales", "Operations"]),
  dateOfAdmission: z
    .string()
    .min(1, "La fecha de ingreso es requerida")
    .refine(
      (val: string) => {
        if (!val) return false;
        const selectedDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "La fecha de ingreso no puede ser anterior a hoy" }
    ),
  salary: z
    .number()
    .min(800, { message: "El salario mínimo es $800" })
    .max(10000, { message: "El salario máximo es $10,000" }),
  country: z.enum(["El Salvador", "Guatemala", "Honduras", "Costa Rica", "Panamá"]),
});

export type EmployeeZod = z.infer<typeof employeeSchema>;