"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FooterButtonsProps {
  loading: boolean;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  secondaryLinkTo: string;
  primaryLabel: string;
  secondaryLabel?: string;
  primaryDisabled?: boolean;
}

export function FooterButtons({
  loading,
  onPrimaryClick,
  onSecondaryClick,
  secondaryLinkTo,
  primaryLabel,
  secondaryLabel = "Cancelar",
  primaryDisabled = false
}: FooterButtonsProps) {
  return (
    <div className="flex justify-end gap-4 pt-6 border-t">
      <Link href={secondaryLinkTo}>
        <Button 
          variant="outline" 
          type="button"
          onClick={onSecondaryClick}
        >
          {secondaryLabel}
        </Button>
      </Link>
      <Button 
        onClick={onPrimaryClick} 
        disabled={loading || primaryDisabled}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Procesando...
          </div>
        ) : (
          primaryLabel
        )}
      </Button>
    </div>
  );
}