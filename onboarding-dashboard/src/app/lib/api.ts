import { Employee } from "../employees/components/schema";

// Lista mock (esto simula la "base de datos")
let employees: Employee[] = [];

// Simular delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchEmployees(): Promise<Employee[]> {
  await delay(500); // simula 500ms de respuesta
  return employees;
}

export async function addEmployee(employee: Employee): Promise<Employee> {
  await delay(800); // simula más demora en crear
  const newEmployee = { ...employee, id: employees.length + 1 };
  employees.push(newEmployee);
  return newEmployee;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  await delay(500);
  return employees.some((e) => e.emailCorporative === email);
}
