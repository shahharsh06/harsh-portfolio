import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InteractiveCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  title,
  className = "",
  headerClassName = "",
  contentClassName = "",
}) => {
  return (
    <Card className={`card-gradient border-border hover:border-primary/30 transition-all duration-300 hover-lift group ${className}`}>
      {title && (
        <CardHeader className={headerClassName}>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={contentClassName}>
        {children}
      </CardContent>
    </Card>
  );
};

export default InteractiveCard; 