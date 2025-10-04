"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";

export interface RHFTextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "date";
  required?: boolean;
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function RHFTextField(props: RHFTextFieldProps) {
  const {
    name,
    label,
    placeholder,
    type = "text",
    required = false,
    disabled = false,
    className = "",
    min,
    max,
    step,
  } = props;

  const { control } = useFormContext();

  return (
    <div className={className}>
      <Label htmlFor={name}>
        {label} {required && "*"}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              value={field.value ?? ""}
              onChange={(e) => {
                if (type === "number") {
                  field.onChange(e.target.value === "" ? "" : Number(e.target.value));
                } else {
                  field.onChange(e.target.value);
                }
              }}
              className={error ? "border-red-500" : ""}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}