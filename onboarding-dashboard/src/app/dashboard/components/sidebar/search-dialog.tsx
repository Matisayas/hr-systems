"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Employee, employees } from "../../hooks/data-employee";

export function GlobalSearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [detailOpen, setDetailOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredItems = employees.filter((item: Employee) =>
    searchQuery === ""
      ? true
      : item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.emailCorporative.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.departament?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
  );

  const handleSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDetailOpen(true);
    setOpen(false);
  };

  return (
    <>
      <Button variant="link" onClick={() => setOpen(true)}>
        <Search className="size-4" /> Search
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Buscar por nombre, correo o departamento..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {filteredItems.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
          {filteredItems.map((item) => (
            <CommandItem
              key={item.emailCorporative}
              onSelect={() => handleSelect(item)}
            >
              <div className="flex flex-col">
                <span className="font-medium">{item.name} {item.surname}</span>
                <span className="text-xs text-muted-foreground">
                  {item.emailCorporative} - {item.departament}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>

    </>
  );
}
