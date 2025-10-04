"use client";

import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { RHFSelectFieldProps } from "./types";
import { useState, useEffect } from "react";
import { THEME_PRESET_OPTIONS } from "@/types/theme";

// Hook para obtener colores del dropdown según theme y modo
function useDropdownColors(themePreset: string, themeMode: "light" | "dark") {
  const preset = THEME_PRESET_OPTIONS.find((p) => p.value === themePreset) || THEME_PRESET_OPTIONS[0];
  return {
    background: preset.dropdown.background[themeMode],
    foreground: preset.dropdown.foreground[themeMode],
    hover: preset.dropdown.hover[themeMode],
    border: preset.dropdown.border[themeMode],
    error: "#ef4444",
  };
}

interface Props extends RHFSelectFieldProps {
  themePreset?: string; // "default" u otro
  themeMode?: "light" | "dark";
}

export default function RHFSelectField({
  themePreset = "default",
  themeMode = "light",
  ...props
}: Props) {
  const {
    name,
    label,
    options,
    required = false,
    disabled = false,
    className = "",
    placeholder = "Seleccionar...",
  } = props;

  const { control } = useFormContext();
  const colors = useDropdownColors(themePreset, themeMode);

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
            <Select
              {...field}
              inputId={name}
              options={options}
              isDisabled={disabled}
              placeholder={placeholder}
              onChange={(val) => field.onChange(val?.value)}
              value={options.find((option) => option.value === field.value) || null}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: colors.background,
                  color: colors.foreground,
                  borderColor: error ? colors.error : colors.border,
                  '&:hover': { borderColor: error ? colors.error : colors.border },
                  boxShadow: "none",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: colors.background,
                  color: colors.foreground,
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? colors.hover : colors.background,
                  color: colors.foreground,
                  cursor: "pointer",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: colors.foreground,
                }),
                placeholder: (base) => ({
                  ...base,
                  color: colors.foreground + "88",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: colors.foreground,
                  '&:hover': { color: colors.foreground },
                }),
                indicatorSeparator: (base) => ({
                  ...base,
                  backgroundColor: colors.border,
                }),
              }}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
}
