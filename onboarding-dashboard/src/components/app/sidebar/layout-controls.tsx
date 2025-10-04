"use client";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle/toggle-group";
import { updateNavbarStyle } from "@/lib/layout-utils";
import { updateThemeMode, updateThemePreset } from "@/lib/theme-utils";
import { setValueToCookie } from "@/server/server-actions";
import { type ThemePreset } from "@/types/theme";
import { usePreferencesStore } from "@/store/preferences/preferences-provider";
import { NavbarStyle, SidebarVariant } from "@/types/layout";


type LayoutControlsProps = {
  readonly variant: SidebarVariant;
  readonly navbarStyle: NavbarStyle;
};

export function LayoutControls(props: LayoutControlsProps) {
  const { variant, navbarStyle } = props;

  const themeMode = usePreferencesStore((s) => s.themeMode);
  const setThemeMode = usePreferencesStore((s) => s.setThemeMode);
  const setThemePreset = usePreferencesStore((s) => s.setThemePreset);

  const handleValueChange = async (key: string, value: string) => {
    if (key === "theme_mode" && (value === "light" || value === "dark")) {
      updateThemeMode(value); // value es ahora "light" | "dark"
      setThemeMode(value);
    }

    if (key === "theme_preset") {
      updateThemePreset(value as ThemePreset);
      setThemePreset(value as ThemePreset);
    }

    if (key === "navbar_style" && (value === "sticky" || value === "scroll")) {
      updateNavbarStyle(value); // value es ahora "sticky" | "scroll"
    }

    if (key === "sidebar_variant" && (value === "inset" || value === "sidebar" || value === "floating")) {
      // value es ahora SidebarVariant
    }

    await setValueToCookie(key, value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon">
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <h4 className="text-sm leading-none font-medium">Configuracion de Vista</h4>
            <p className="text-muted-foreground text-xs">Customice su dashboard de preferencia.</p>
          </div>
          <div className="space-y-3">

            <div className="space-y-1">
              <Label className="text-xs font-medium">Modo</Label>
              <ToggleGroup
                className="w-full"
                size="sm"
                variant="outline"
                type="single"
                value={themeMode}
                onValueChange={(value) => value && handleValueChange("theme_mode", value)}
              >
                <ToggleGroupItem className="text-xs" value="light" aria-label="Toggle inset">
                  Claro
                </ToggleGroupItem>
                <ToggleGroupItem className="text-xs" value="dark" aria-label="Toggle sidebar">
                  Oscuro
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Tipo de barra de navegacion</Label>
              <ToggleGroup
                className="w-full"
                size="sm"
                variant="outline"
                type="single"
                value={variant}
                onValueChange={(value) => value && handleValueChange("sidebar_variant", value)}

              >
                <ToggleGroupItem className="text-xs" value="inset" aria-label="Toggle inset">
                  Integrada
                </ToggleGroupItem>
                <ToggleGroupItem className="text-xs" value="sidebar" aria-label="Toggle sidebar">
                  Lateral
                </ToggleGroupItem>
                <ToggleGroupItem className="text-xs" value="floating" aria-label="Toggle floating">
                  Flotante
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Tipo de barra superior</Label>
              <ToggleGroup
                className="w-full"
                size="sm"
                variant="outline"
                type="single"
                value={navbarStyle}
                onValueChange={(value) => value && handleValueChange("navbar_style", value)}
              >
                <ToggleGroupItem className="text-xs" value="sticky" aria-label="Toggle sticky">
                  Desplazable
                </ToggleGroupItem>
                <ToggleGroupItem className="text-xs" value="scroll" aria-label="Toggle scroll">
                  Fijo
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

