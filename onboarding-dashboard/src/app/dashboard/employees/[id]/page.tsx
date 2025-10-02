"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Employee } from "../../components/schema";
import { AddEditEmployeeModal } from "../../components/modals/edit-employee";

// Simulación de datos
const employees: Employee[] = [
  {
    id: 1,
    name: "Juan",
    surname: "Pérez",
    emailCorporative: "juan@empresa.com",
    departament: "Engineering",
    dateOfAdmission: "2025-10-02",
    salary: 2000,
    country: "El Salvador",
  },
];

export default function EmployeeDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const employeeId = Number(params.id);
  const employee = employees.find((e) => e.id === employeeId) || null;

  const [isEditOpen, setIsEditOpen] = React.useState(false);

  if (!employee) {
    return (
      <div className="p-4 text-center">
        <p>Empleado no encontrado</p>
        <Button onClick={() => router.push("/dashboard/employees")}>Volver a lista</Button>
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
      {isEditOpen && (
        <AddEditEmployeeModal
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          employeeData={employee}
          onSubmit={(data) => {
            console.log("Empleado editado:", data);
            setIsEditOpen(false);
            // 🔥 Aquí podés actualizar la lista o llamar a tu API
          }}
        />
      )}
    </div>
  );
}
