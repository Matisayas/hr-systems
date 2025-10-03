"use client";

import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/components/auth/auth-provider";
import { getInitials } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { users } from "@/data/users";

export function AuthLogout() {
  const { user, logout, loading } = useAuthContext();


  // Si está cargando, mostrar skeleton
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="size-9 rounded-lg" />
      </div>
    );
  }

  // Si no hay usuario PERO pasó el AuthCheck del servidor, significa que hay token
  // pero el cliente aún no se sincronizó. Mostrar el avatar basado en rootUser
  if (!user) {
    
    // Usar rootUser directamente ya que el servidor confirmó que hay token
    const fallbackUser = users[0]; // o importa rootUser directamente
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-9 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors">
            <AvatarImage src={fallbackUser.avatar || undefined} alt={fallbackUser.name} />
            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-medium">
              {getInitials(fallbackUser.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="min-w-56 rounded-lg" 
          side="bottom" 
          align="end" 
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-3 px-2 py-2.5 text-left text-sm">
              <Avatar className="size-9 rounded-lg">
                <AvatarImage src={fallbackUser.avatar || undefined} alt={fallbackUser.name} />
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                  {getInitials(fallbackUser.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{fallbackUser.name}</span>
                <span className="truncate text-xs text-muted-foreground capitalize">
                  {fallbackUser.role}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {fallbackUser.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="gap-2 px-2 py-2">
            <User className="size-4" />
            <span>Mi cuenta</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={logout}
            className="gap-2 px-2 py-2 text-destructive focus:text-destructive cursor-pointer"
          >
            <LogOut className="size-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Usuario normal
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors">
          <AvatarImage src={user.avatar || undefined} alt={user.name} />
          <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-medium">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="min-w-56 rounded-lg" 
        side="bottom" 
        align="end" 
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-2 py-2.5 text-left text-sm">
            <Avatar className="size-9 rounded-lg">
              <AvatarImage src={user.avatar || undefined} alt={user.name} />
              <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground capitalize">
                {user.role}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="gap-2 px-2 py-2">
          <User className="size-4" />
          <span>Mi cuenta</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={logout}
          className="gap-2 px-2 py-2 text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="size-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}