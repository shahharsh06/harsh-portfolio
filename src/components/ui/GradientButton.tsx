import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "full-width";
  asChild?: boolean;
}

export const GradientButton = ({
  children,
  className,
  variant = "default",
  asChild,
  ...props
}: GradientButtonProps) => {
  const baseClasses =
    "bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 hover-lift text-white font-medium shadow-lg";
  const widthClasses = variant === "full-width" ? "w-full" : "";

  return (
    <Button
      className={cn(baseClasses, widthClasses, className)}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  );
};
