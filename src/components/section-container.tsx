import React from 'react';
import { cn } from './ui/utils';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "w-full max-w-[1440px] h-screen mx-auto bg-[#FAFAFA] pt-20",
      className
    )}>
      {children}
    </div>
  );
};
