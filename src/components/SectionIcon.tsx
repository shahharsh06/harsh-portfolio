import React from "react";

interface SectionIconProps {
  icon: React.ReactElement;
  size?: number; // default 24
  className?: string;
  padding?: string; // e.g., 'p-3' or 'p-2'
  interactive?: boolean; // enables hover/focus/active effects
}

export const SectionIcon: React.FC<SectionIconProps> = ({
  icon,
  size = 24,
  className = "",
  padding = "p-3",
  interactive = false,
}) => (
  <div
    tabIndex={interactive ? 0 : undefined}
    className={
      `${padding} bg-primary/10 rounded-full flex items-center justify-center transition-smooth ${className} ` +
      (interactive
        ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 hover:scale-110 active:scale-95 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/30 shadow-md hover:shadow-lg'
        : 'group-hover:bg-primary/20')
    }
    style={{ width: size + 16, height: size + 16 }}
  >
    {React.cloneElement(icon, {
      className: `text-primary`,
      style: { width: size, height: size },
    })}
  </div>
);

export default SectionIcon; 