"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { Employee, employees } from "../../../app/employees/hooks/data-employee";
import { Badge } from "@/components/ui/badge";

export function GlobalSearchDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      
      // Escape para cerrar
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  // Resetear búsqueda cuando se abre/cierra el diálogo
  React.useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setSearchQuery(""), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const filteredItems = React.useMemo(() => 
    employees.filter((item: Employee) =>
      searchQuery === ""
        ? false
        : item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.emailCorporative.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.departament?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  const handleSelect = (employee: Employee) => {
    router.push(`/employees/edit/${employee.id}`);
    setOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSearchQuery("");
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 relative w-60 justify-start text-muted-foreground"
      >
        <Search className="size-4" /> 
        <span>Buscar empleados...</span>
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>

      <CommandDialog 
        open={open} 
        onOpenChange={handleOpenChange}
      >
        <div className="flex items-center px-3">
          <CommandInput
            placeholder="Buscar por nombre, apellido, correo o departamento..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="flex-1"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="ml-2 h-8 w-8 p-0"
            >
              <X className="size-4" />
            </Button>
          )}
        </div>
        
        <CommandList>
          {searchQuery && (
            <div className="px-3 py-2 text-xs text-muted-foreground">
              {filteredItems.length > 0 ? (
                <span>
                  {filteredItems.length} resultado{filteredItems.length > 1 ? 's' : ''} encontrado{filteredItems.length > 1 ? 's' : ''}
                </span>
              ) : (
              <span>No se encontraron resultados para &quot;{searchQuery}&quot;</span> 
              )}
            </div>
          )}
          
          <CommandGroup>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <CommandItem
                  key={`${item.id}-${item.emailCorporative}`}
                  onSelect={() => handleSelect(item)}
                  className="cursor-pointer py-3"
                  // Valor que incluye todos los campos para el filtro interno
                  value={`${item.name} ${item.surname} ${item.emailCorporative} ${item.departament}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col flex-1">
                      <span className="font-medium">
                        {item.name} {item.surname}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.emailCorporative}
                      </span>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {item.departament}
                    </Badge>
                  </div>
                </CommandItem>
              ))
            ) : searchQuery ? (
              <CommandEmpty className="py-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Search className="size-8 text-muted-foreground" />
                  <p>No se encontraron empleados</p>
                  <p className="text-xs text-muted-foreground">
                    Intenta con otros términos de búsqueda
                  </p>
                </div>
              </CommandEmpty>
            ) : (
              <div className="py-8 text-center">
                <Search className="size-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Escribe para buscar empleados...
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Puedes buscar por nombre, apellido, email o departamento
                </p>
              </div>
            )}
          </CommandGroup>

          {/* Footer con atajos de teclado */}
          <div className="border-t px-3 py-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border px-1.5 py-0.5">↑↓</kbd>
                  <span>Navegar</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border px-1.5 py-0.5">↵</kbd>
                  <span>Seleccionar</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="rounded border px-1.5 py-0.5">ESC</kbd>
                <span>Cerrar</span>
              </span>
            </div>
          </div>
        </CommandList>
      </CommandDialog>
    </>
  );
}