"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { RHFEmailFieldProps } from "./types";

export default function RHFEmailField(props: RHFEmailFieldProps) {
  const {
    name,
    label,
    placeholder = "usuario@empresa.com",
    required = false,
    disabled = false,
    className = "",
    existingEmployees = [],
  } = props;

  const { 
    control, 
    watch, 
    setError, 
    clearErrors, 
    trigger 
  } = useFormContext();

  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const emailValue = watch(name);

  // Validación asíncrona del email
useEffect(() => {
  if (!emailValue || !emailValue.includes("@")) return;

  const timeoutId = setTimeout(() => {
    const emailExists = existingEmployees.some(
      e => e.emailCorporative.toLowerCase() === emailValue.toLowerCase()
    );

    setIsCheckingEmail(true);

    if (emailExists) {
      setError(name, {
        type: "manual",
        message: "El email ya está registrado en el sistema",
      });
    } else {
      clearErrors(name);
    }

    setIsCheckingEmail(false);
    trigger(name);
  }, 800);

  return () => clearTimeout(timeoutId);
}, [emailValue, existingEmployees, setError, clearErrors, trigger, name]);


  return (
    <div className={className}>
      <Label htmlFor={name}>
        {label} {required && "*"}
      </Label>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Input
                {...field}
                id={name}
                type="email"
                placeholder={placeholder}
                disabled={disabled}
                value={field.value ?? ""}
                className={error ? "border-red-500" : ""}
              />
              {isCheckingEmail && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
          )}
        />
      </div>
      
      {/* Mensaje de error separado */}
      <Controller
        name={name}
        control={control}
        render={({ fieldState: { error } }) => (
          <>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
}