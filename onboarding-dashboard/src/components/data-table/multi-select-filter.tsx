"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface MultiSelectFilterProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onValueChange: (values: string[]) => void;
}

export function MultiSelectFilter({ 
  title, 
  options, 
  selectedValues, 
  onValueChange 
}: MultiSelectFilterProps) {
  const handleSelect = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onValueChange(newValues);
  };

  const handleClear = () => {
    onValueChange([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          {title}
          <ChevronDown className="h-4 w-4" />
          {selectedValues.length > 0 && (
            <Badge variant="secondary" className="px-1 font-normal">
              {selectedValues.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <div className="flex items-center justify-between p-2">
          <span className="text-sm text-muted-foreground">
            {selectedValues.length} seleccionados
          </span>
          {selectedValues.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClear} className="h-auto p-0 text-xs">
              Limpiar
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedValues.includes(option)}
            onCheckedChange={() => handleSelect(option)}
            className="cursor-pointer"
          >
            {option}
            {selectedValues.includes(option) && (
              <Check className="ml-auto h-4 w-4" />
            )}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}