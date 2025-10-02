export const THEME_MODE_OPTIONS = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
] as const;

export const THEME_MODE_VALUES = THEME_MODE_OPTIONS.map((m) => m.value);
export type ThemeMode = (typeof THEME_MODE_VALUES)[number];

// --- generated:themePresets:start ---

export const THEME_PRESET_OPTIONS = [
    {
    label: "Default",
    value: "default",
    primary: {
      light: "oklch(0.205 0 0)",
      dark: "oklch(0.922 0 0)",
    },
  },
  {
    label: "Tangerine",
    value: "tangerine",
    primary: { light: "oklch(0.64 0.17 36.44)", dark: "oklch(0.70 0.18 36.44)" },
    foreground: { light: "oklch(0 0 0)", dark: "oklch(0.95 0 0)" },
    background: { light: "oklch(0.94 0 36)", dark: "oklch(0.15 0 36)" },
    card: { light: "oklch(0.98 0.05 36)", dark: "oklch(0.25 0.05 36)" },
  },
  { label: "Soft Pop",
    value: "soft-pop",
    primary: { light: "oklch(0.7 0.2 320)", dark: "oklch(0.6 0.15 320)" },
    foreground: { light: "oklch(0 0 0)", dark: "oklch(0.95 0 0)" },
    background: { light: "oklch(0.98 0.1 320)", dark: "oklch(0.15 0.1 320)" },
    card: { light: "oklch(0.99 0.05 320)", dark: "oklch(0.25 0.05 320)" },
    },
] as const;


export const THEME_PRESET_VALUES = THEME_PRESET_OPTIONS.map((p) => p.value);
export type ThemePreset = (typeof THEME_PRESET_OPTIONS)[number]["value"];

// --- generated:themePresets:end ---
