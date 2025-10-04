import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { getPreference } from "@/server/server-actions";
import { PreferencesStoreProvider } from "@/store/preferences/preferences-provider";
import { THEME_MODE_VALUES, THEME_PRESET_VALUES, type ThemePreset, type ThemeMode } from "@/types/theme";
import { AuthProvider } from "@/components/auth/auth-provider";
import "./globals.css";
import { employees as initialEmployees } from "./employees/hooks/data-employee";
import { EmployeeProvider } from "@/contexts/employee-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rebu HR",
  description: "Sistema de gestión de empleados Rebu",
};

// Componente para evitar problemas de hidratación
function ClientBody({ 
  children, 
  themeMode,
  themePreset 
}: { 
  children: ReactNode;
  themeMode: ThemeMode;
  themePreset: ThemePreset;
}) {
  return (
    <body 
      className={`${inter.className} min-h-screen antialiased`}
      suppressHydrationWarning
    >
      <PreferencesStoreProvider themeMode={themeMode} themePreset={themePreset}>
        <EmployeeProvider initialData={initialEmployees}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </EmployeeProvider>
      </PreferencesStoreProvider>
    </body>
  );
}

export default async function RootLayout({ 
  children 
}: Readonly<{ 
  children: ReactNode 
}>) {
  const themeMode = await getPreference<ThemeMode>("theme_mode", THEME_MODE_VALUES, "light");
  const themePreset = await getPreference<ThemePreset>("theme_preset", THEME_PRESET_VALUES, "default");

  return (
    <html
      lang="en"
      className={themeMode === "dark" ? "dark" : ""}
      data-theme-preset={themePreset}
      suppressHydrationWarning
    >
      <ClientBody themeMode={themeMode} themePreset={themePreset}>
        {children}
      </ClientBody>
    </html>
  );
}