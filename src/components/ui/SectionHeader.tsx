import { LucideIcon } from "lucide-react";
import SectionIcon from "../SectionIcon";

interface SectionHeaderProps {
  title: string;
  gradientWord: string;
  icon: LucideIcon;
  description: string;
  className?: string;
}

export const SectionHeader = ({ 
  title,
  gradientWord, 
  icon: Icon, 
  description, 
  className = "" 
}: SectionHeaderProps) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
        <SectionIcon icon={<Icon />} size={28} padding="p-3" interactive={true} />
        <span>{title} <span className="text-gradient">{gradientWord}</span></span>
      </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {description}
        </p>
    </div>
  );
};