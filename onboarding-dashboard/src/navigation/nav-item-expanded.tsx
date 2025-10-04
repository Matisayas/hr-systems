"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type NavMainItem } from "@/navigation/sidebar-items";
import { useState } from "react";

interface NavItemExpandedProps {
  item: NavMainItem;
  isActive: (href: string, subItems?: NavMainItem["subItems"]) => boolean;
  isSubmenuOpen: (subItems?: NavMainItem["subItems"]) => boolean;
}

export function NavItemExpanded({ item, isActive, isSubmenuOpen }: NavItemExpandedProps) {
  const [isOpen, setIsOpen] = useState(isSubmenuOpen(item.subItems));

  // Si el item no tiene subItems, renderizar como enlace simple
  if (!item.subItems || item.subItems.length === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={isActive(item.href)}
          aria-disabled={item.comingSoon}
        >
          <Link href={item.href} target={item.newTab ? "_blank" : undefined}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  // Si tiene subItems, renderizar como acordeón
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild={false}
        isActive={isActive(item.href, item.subItems)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <button type="button" className="w-full">
          {item.icon && <item.icon />}
          <span className="flex-1 text-left">{item.title}</span>
          <ChevronDown
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </SidebarMenuButton>
      
      {isOpen && (
        <div className="mt-1 ml-2 space-y-1 border-l-2 border-sidebar-border pl-2">
          {item.subItems.map((subItem) => (
            <SidebarMenuButton
              key={subItem.href}
              asChild
              size="sm"
              isActive={isActive(subItem.href)}
              aria-disabled={subItem.comingSoon}
            >
              <Link href={subItem.href} target={subItem.newTab ? "_blank" : undefined}>
                {subItem.icon && <subItem.icon />}
                <span>{subItem.title}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </div>
      )}
    </SidebarMenuItem>
  );
}