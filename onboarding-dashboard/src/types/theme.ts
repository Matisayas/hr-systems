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
    dropdown: {
      background: {
        light: "oklch(1 0 0)",
        dark: "oklch(0.205 0 0)",
      },
      foreground: {
        light: "oklch(0.145 0 0)",
        dark: "oklch(0.985 0 0)",
      },
      hover: {
        light: "oklch(0.97 0 0)",
        dark: "oklch(0.269 0 0)",
      },
      border: {
        light: "oklch(0.922 0 0)",
        dark: "oklch(1 0 0 / 15%)",
      },
    },
  },
] as const;

export const THEME_PRESET_VALUES = THEME_PRESET_OPTIONS.map((p) => p.value);
export type ThemePreset = (typeof THEME_PRESET_OPTIONS)[number]["value"];

// --- generated:themePresets:end ---