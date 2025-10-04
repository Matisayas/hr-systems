"use client";

import { useEffect, useState } from "react";

interface HydrationFixWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function HydrationFixWrapper({ 
  children, 
  fallback 
}: HydrationFixWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Evitar renderizado diferente entre server y client
  if (!isMounted) {
    return fallback || (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <div className="text-lg text-muted-foreground">Cargando...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}