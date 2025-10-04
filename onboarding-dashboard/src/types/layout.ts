// Sidebar Variant
export const SIDEBAR_VARIANT_OPTIONS = [
  { label: "Inset", value: "inset" },
  { label: "Sidebar", value: "sidebar" },
  { label: "Floating", value: "floating" },
] as const;
export const SIDEBAR_VARIANT_VALUES = SIDEBAR_VARIANT_OPTIONS.map((v) => v.value);
export type SidebarVariant = (typeof SIDEBAR_VARIANT_VALUES)[number];

// Navbar Style
export const NAVBAR_STYLE_OPTIONS = [
  { label: "Fijo", value: "sticky" },
  { label: "Desplazable", value: "scroll" },
] as const;
export const NAVBAR_STYLE_VALUES = NAVBAR_STYLE_OPTIONS.map((v) => v.value);
export type NavbarStyle = (typeof NAVBAR_STYLE_VALUES)[number];
