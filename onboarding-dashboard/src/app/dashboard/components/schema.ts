import { z } from "zod";

export const employeeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(3),
  surname: z.string().min(3),
  emailCorporative: z.string().email(),
  dateOfAdmission: z.string(),
  salary: z.number().min(800).max(10000),
  country: z.string(),
  departament: z.string().optional(),
});

export type Employee = z.infer<typeof employeeSchema>;
