import React from "react";

interface SkillTagProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const SkillTag: React.FC<SkillTagProps> = ({
  children,
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`${sizeClasses[size]} bg-background/50 border border-border rounded-full font-medium hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 inline-flex items-center justify-center ${className}`}
    >
      {children}
    </span>
  );
};

export default SkillTag;
