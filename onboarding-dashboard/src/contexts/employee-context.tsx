"use client";
import * as React from "react";
import { Employee } from "@/app/dashboard/hooks/data-employee";

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: number, employee: Employee) => void;
  deleteEmployee: (id: number) => void;
}

const EmployeeContext = React.createContext<EmployeeContextType | undefined>(undefined);

const EMPLOYEES_STORAGE_KEY = "rebuhremployees-data";

export function EmployeeProvider({ 
  children, 
  initialData 
}: { 
  children: React.ReactNode; 
  initialData: Employee[];
}) {
  // Estado para controlar cuándo estamos en el cliente
  const [isClient, setIsClient] = React.useState(false);
  
  const [employees, setEmployees] = React.useState<Employee[]>(initialData);

  // Marcar que estamos en el cliente después de la hidratación
  React.useEffect(() => {
    setIsClient(true);
    
    // Solo en el cliente: cargar datos del localStorage
    try {
      const saved = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
      if (saved) {
        const parsedData = JSON.parse(saved);
        setEmployees(parsedData);
      }
    } catch (error) {
      console.error("Error loading employees from storage:", error);
    }
  }, []);

  // Guardar en localStorage cuando cambien los empleados (solo en cliente)
  React.useEffect(() => {
    if (isClient && employees.length > 0) {
      localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
    }
  }, [employees, isClient]);

  const addEmployee = React.useCallback((employee: Employee) => {
    
    const newEmployee: Employee = {
      ...employee,
      id: employee.id || Math.floor(Date.now() + Math.random() * 1000)
    };

    setEmployees(prev => {
      const updated = [...prev, newEmployee];
      return updated;
    });
  }, []);

  const updateEmployee = React.useCallback((id: number, employee: Employee) => {
    setEmployees(prev => 
      prev.map(emp => emp.id === id ? { ...employee, id } : emp)
    );
  }, []);

  const deleteEmployee = React.useCallback((id: number) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  }, []);

  const value = React.useMemo(() => ({
    employees: isClient ? employees : initialData, 
    addEmployee,
    updateEmployee,
    deleteEmployee
  }), [employees, addEmployee, updateEmployee, deleteEmployee, isClient, initialData]);

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = React.useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return context;
}