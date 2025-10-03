"use client";

import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { NavMain } from "../nav-bar/nav-main";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { rootUser } from "@/data/users";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
    </Sidebar>
  );
}
