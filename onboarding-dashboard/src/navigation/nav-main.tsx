"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { type NavGroup, type NavMainItem } from "@/navigation/sidebar-items";
import { NavItemExpanded } from "@/navigation/nav-item-expanded";

interface NavMainProps {
  readonly items: readonly NavGroup[];
}


export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isItemActive = (href: string, subItems?: NavMainItem["subItems"]) => {
    if (subItems?.length) {
      return subItems.some((sub) => pathname.startsWith(sub.href));
    }
    return pathname === href;
  };

  const isSubmenuOpen = (subItems?: NavMainItem["subItems"]) => {
    return subItems?.some((sub) => pathname.startsWith(sub.href)) ?? false;
  };

  return (
    <>
      {items.map((group) => (
        <SidebarGroup key={group.id}>
          <SidebarMenu>
            {group.items.map((item) => {
              // Vista colapsada (sidebar cerrado)
              if (state === "collapsed" && !item.subItems) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      aria-disabled={item.comingSoon}
                      tooltip={item.title}
                      isActive={isItemActive(item.href)}
                    >
                      <Link href={item.href} target={item.newTab ? "_blank" : undefined}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return (
                <NavItemExpanded 
                  key={item.title} 
                  item={item} 
                  isActive={isItemActive} 
                  isSubmenuOpen={isSubmenuOpen} 
                />
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}