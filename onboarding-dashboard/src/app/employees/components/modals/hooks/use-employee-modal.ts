"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Employee, EmployeeFormData, employeeSchema } from "../../schema";

interface UseEmployeeModalProps {
  employeeData: Employee;
  onSubmit: (data: EmployeeFormData) => void;
  existingEmployees?: Employee[];
}

interface UseEmployeeModalReturn {
  methods: UseFormReturn<EmployeeFormData>;
  handleFormSubmit: (data: EmployeeFormData) => void;
  handleCancel: () => void;
  isEditing: boolean;
  isSubmitting: boolean;
}

export function useEmployeeModal({
  employeeData,
  onSubmit,
}: UseEmployeeModalProps): UseEmployeeModalReturn {
  const methods = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema.omit({ id: true })),
    defaultValues: {
      name: employeeData.name || "",
      surname: employeeData.surname || "",
      emailCorporative: employeeData.emailCorporative || "",
      departament: employeeData.departament || "Engineering",
      dateOfAdmission: employeeData.dateOfAdmission || "",
      salary: employeeData.salary || 800,
      country: employeeData.country || "El Salvador",
    },
  });

  useEffect(() => {
    if (employeeData) {
      methods.reset({
        name: employeeData.name,
        surname: employeeData.surname,
        emailCorporative: employeeData.emailCorporative,
        departament: employeeData.departament,
        dateOfAdmission: employeeData.dateOfAdmission,
        salary: employeeData.salary,
        country: employeeData.country,
      });
    }
  }, [employeeData, methods]);

  const handleFormSubmit = (data: EmployeeFormData) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    methods.reset();
  };

  const isEditing = !!employeeData.id;
  const isSubmitting = methods.formState.isSubmitting;

  return {
    methods,
    handleFormSubmit,
    handleCancel,
    isEditing,
    isSubmitting,
  };
}