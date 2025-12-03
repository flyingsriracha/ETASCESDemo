import React from 'react';
import { cn } from './ui/utils';

interface ETASButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  rounded?: boolean;
  disabled?: boolean;
}

export const ETASButton: React.FC<ETASButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  className,
  icon,
  rounded = false,
  disabled = false,
}) => {
  // Base styles matching ETAS CI 2.0 design system
  // Padding: 0.5rem (8px) top/bottom, 1rem (16px) left/right
  // Border radius: 50px - matching ETAS CI 2.0 design system
  // Font: Manrope SemiBold (600 weight, 16px base size)
  // Height: 2.5rem (40px) matching corporate standard
  // Transition: smooth 0.2s ease for all properties
  const borderRadiusClass = rounded ? "rounded-full" : "rounded-[50px]";
  
  const baseStyles = cn(
    "px-4 py-2 min-h-[2.5rem] flex-shrink-0", // Minimum height for consistent shape, allows custom padding
    "flex items-center justify-center gap-1.5",
    "text-center whitespace-normal leading-tight",
    "font-semibold text-sm", // semibold-s equivalent
    "transition-all duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      borderRadiusClass, // 50px border-radius matching ETAS CI 2.0 design system
    className
  );
  
  const variants = {
    primary: cn(
      "bg-primary text-primary-foreground border-0",
      "hover:bg-primary/90 hover:shadow-md",
      "active:bg-primary/95 active:shadow-sm",
      "focus:ring-primary"
    ),
    secondary: cn(
      "bg-secondary text-secondary-foreground border-0",
      "hover:bg-secondary/90 hover:shadow-md",
      "active:bg-secondary/95 active:shadow-sm",
      "focus:ring-secondary"
    ),
    ghost: cn(
      "bg-transparent border border-primary text-primary",
      "hover:bg-primary hover:text-primary-foreground hover:border-primary",
      "active:bg-primary/95 active:text-primary-foreground active:border-primary",
      "focus:ring-primary"
    ),
    text: cn(
      "bg-transparent text-foreground",
      "hover:bg-muted/50",
      "active:bg-muted",
      "focus:ring-primary",
      "border-0 shadow-none"
    ),
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant])}
      style={{
        borderRadius: rounded ? '9999px' : '50px', // Force 50px border-radius matching corporate design system
      }}
    >
      {icon && <span className="flex-shrink-0 flex items-center justify-center">{icon}</span>}
      <span className="flex-1 min-w-0 text-center">{children}</span>
    </button>
  );
};
