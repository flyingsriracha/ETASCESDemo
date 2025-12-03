import React from 'react';
import { cn } from './ui/utils';

interface ETASButtonEnhancedProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const ETASButtonEnhanced: React.FC<ETASButtonEnhancedProps> = ({
  variant = 'primary',
  state = 'default',
  children,
  onClick,
  className,
  icon,
  disabled = false,
}) => {
  const baseStyles = "px-6 py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 min-h-[56px] focus:outline-none focus:ring-2 focus:ring-[#007BC2] focus:ring-offset-2";
  
  const variants = {
    primary: {
      default: "gradient-etas text-white",
      hover: "gradient-etas text-white opacity-90 shadow-lg scale-[1.02]",
      pressed: "gradient-etas text-white opacity-80 scale-[0.98]",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    secondary: {
      default: "bg-transparent border-2 border-[#164293] text-[#164293]",
      hover: "bg-transparent border-2 border-[#164293] text-[#164293] shadow-md scale-[1.01]",
      pressed: "bg-transparent border-2 border-[#164293] text-[#164293] scale-[0.98]",
      disabled: "bg-transparent border-2 border-gray-300 text-gray-400 cursor-not-allowed",
    },
    ghost: {
      default: "bg-transparent text-[#164293]",
      hover: "bg-[#F0F4FF] text-[#164293]",
      pressed: "bg-[#E0E8FF] text-[#164293]",
      disabled: "bg-transparent text-gray-400 cursor-not-allowed",
    },
  };

  const currentState = disabled ? 'disabled' : state;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant][currentState], className)}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
