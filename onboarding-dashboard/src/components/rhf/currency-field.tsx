"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { RHFCurrencyFieldProps } from "./types";
import { useState } from "react";

export default function RHFCurrencyField(props: RHFCurrencyFieldProps) {
  const {
    name,
    label,
    placeholder,
    required = false,
    disabled = false,
    className = "",
    min,
    max,
    step,
    currencySymbol = "$",
  } = props;

  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];
  const [displayValue, setDisplayValue] = useState<string>("");

  return (
    <div className={className}>
      <Label htmlFor={name}>
        {label} {required && "*"}
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500">{currencySymbol}</span>
        </div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={name}
              type="text" // Cambiar a text para mejor control
              placeholder={placeholder}
              disabled={disabled}
              value={field.value === 0 ? "0" : field.value || ""}
              onChange={(e) => {
                const value = e.target.value;
                
                // Permitir solo números, punto decimal y negativo
                const sanitizedValue = value.replace(/[^\d.-]/g, '');
                
                // Si está vacío, establecer 0
                if (sanitizedValue === "" || sanitizedValue === "-" || sanitizedValue === ".") {
                  field.onChange(0);
                  setDisplayValue(sanitizedValue);
                } else {
                  const numValue = Number(sanitizedValue);
                  if (!isNaN(numValue)) {
                    field.onChange(numValue);
                    setDisplayValue(sanitizedValue);
                  }
                }
              }}
              onBlur={(e) => {
                // Al salir del campo, asegurar que tenga un valor válido
                const value = e.target.value;
                if (value === "" || value === "-" || value === ".") {
                  field.onChange(0);
                  setDisplayValue("0");
                } else {
                  const numValue = Number(value);
                  if (isNaN(numValue)) {
                    field.onChange(0);
                    setDisplayValue("0");
                  }
                }
              }}
              onFocus={(e) => {
                // Al enfocar, si el valor es 0, limpiar el campo temporalmente
                if (field.value === 0) {
                  setDisplayValue("");
                }
              }}
              className={`pl-8 ${error ? "border-red-500" : ""}`}
            />
          )}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message as string}
        </p>
      )}
    </div>
  );
}