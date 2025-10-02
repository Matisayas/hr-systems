import { DataTable } from "./components/data-table";
import { employees } from "./hooks/data-employee";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <DataTable data={employees} />
    </div>
  );
}
