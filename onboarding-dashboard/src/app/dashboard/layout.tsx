import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { getPreference } from "@/server/server-actions";
import {
  SIDEBAR_VARIANT_VALUES,
  NAVBAR_STYLE_VALUES,
  type SidebarVariant,
  type NavbarStyle,
} from "@/types/layout";
import { GlobalSearchDialog } from "./components/sidebar/search-dialog";
import { LayoutControls } from "./components/sidebar/layout-controls";
import { ThemeSwitcher } from "./components/sidebar/theme-switcher";
import { AuthLogout } from "./components/auth-logout";
import { AppSidebar } from "./components/sidebar/app-sidebar";

async function AuthCheck({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  return <>{children}</>;
}

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const [sidebarVariant, navbarStyle] = await Promise.all([
    getPreference<SidebarVariant>("sidebar_variant", SIDEBAR_VARIANT_VALUES, "inset"),
    getPreference<NavbarStyle>("navbar_style", NAVBAR_STYLE_VALUES, "scroll"),
  ]);

  const layoutPreferences = {
    variant: sidebarVariant,
    navbarStyle: navbarStyle ?? "sticky",
  };

  return (
    <AuthCheck>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar variant={sidebarVariant} />
          <SidebarInset
            className={cn(
              "data-[content-layout=centered]:!mx-auto data-[content-layout=centered]:max-w-screen-2xl",
              "max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto",
            )}
          >
            <header
              data-navbar-style={navbarStyle}
              className={cn(
                "flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
                "data-[navbar-style=sticky]:bg-background/50 data-[navbar-style=sticky]:sticky data-[navbar-style=sticky]:top-0 data-[navbar-style=sticky]:z-50 data-[navbar-style=sticky]:overflow-hidden data-[navbar-style=sticky]:rounded-t-[inherit] data-[navbar-style=sticky]:backdrop-blur-md",
              )}
            >
              <div className="flex w-full items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-1 lg:gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <GlobalSearchDialog />
                </div>
                <div className="flex items-center gap-2">
                  <LayoutControls {...layoutPreferences} />
                  <ThemeSwitcher />
                  <AuthLogout />
                </div>
              </div>
            </header>
            <div className="h-full p-4 md:p-6">{children}</div>
          </SidebarInset>
        </SidebarProvider>
    </AuthCheck>
  );
}