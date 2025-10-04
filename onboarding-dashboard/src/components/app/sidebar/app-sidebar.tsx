"use client";

import { sidebarItems } from "@/navigation/sidebar-items";
import { NavMain } from "../../../navigation/nav-main";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
    </Sidebar>
  );
}
