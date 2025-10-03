import { EmployeeTable } from "@/components/data-table/employee-table";
import { DataTable } from "./components/data-table";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <EmployeeTable />  {/* ← Solo esta tabla con TODO */}
    </div>
  );
}