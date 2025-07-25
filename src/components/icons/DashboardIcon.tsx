import React from 'react';

interface DashboardIconProps {
  className?: string;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({ className = "h-4 w-4" }) => {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
    </svg>
  );
};

export default DashboardIcon; 