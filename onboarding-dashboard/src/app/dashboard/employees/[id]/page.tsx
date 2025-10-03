"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEmployees } from "@/contexts/employee-context";
import { AddEditEmployeeModal } from "../../components/modals/edit-employee";

export default function EmployeeDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const employeeId = Number(params.id);
  
  const { employees, updateEmployee } = useEmployees();
  
  // Busca el empleado en los datos del contexto
  const employee = employees.find((e) => e.id === employeeId) || null;

  const [isEditOpen, setIsEditOpen] = React.useState(false);

  const handleEditSubmit = (data: any) => {
    if (employee && employee.id) { // ← Verificamos que tenga id
      updateEmployee(employee.id, { ...data, id: employee.id });
      setIsEditOpen(false);
    }
  };

  if (!employee) {
    return (
      <div className="p-4 text-center">
        <p>Empleado no encontrado</p>
        <Button onClick={() => router.push("/dashboard")}>Volver a lista</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">
        Detalle de {employee.name} {employee.surname}
      </h1>

      <div className="grid gap-2 border p-4 rounded-md">
        <p><strong>Email:</strong> {employee.emailCorporative}</p>
        <p><strong>Departamento:</strong> {employee.departament}</p>
        <p><strong>País:</strong> {employee.country}</p>
        <p><strong>Salario:</strong> ${employee.salary}</p>
        <p><strong>Fecha de ingreso:</strong> {employee.dateOfAdmission}</p>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setIsEditOpen(true)}>Editar</Button>
        <Button variant="secondary" onClick={() => router.push("/dashboard")}>
          Volver a lista
        </Button>
      </div>

      {/* Modal de edición */}
      <AddEditEmployeeModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        employeeData={employee}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
}