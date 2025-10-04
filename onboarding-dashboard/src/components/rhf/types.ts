import { Employee, EmployeeFormData } from "@/app/employees/components/schema";

export type RHFTextFieldProps = {
  name: keyof EmployeeFormData;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "date";
  required?: boolean;
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};

export type RHFSelectFieldProps = {
  name: keyof EmployeeFormData;
  label: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
};

export type RHFEmailFieldProps = {
  name: keyof EmployeeFormData;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  existingEmployees?: Array<Employee>;
};

export interface RHFCurrencyFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  currencySymbol?: string;
}
