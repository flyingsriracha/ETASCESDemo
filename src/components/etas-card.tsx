import React from 'react';
import { cn } from './ui/utils';

interface ETASCardProps {
  size?: 'M' | 'L';
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ETASCard: React.FC<ETASCardProps> = ({
  size = 'M',
  header,
  children,
  className,
}) => {
  const sizes = {
    M: 'w-[640px]',
    L: 'w-[960px]',
  };

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-lg overflow-hidden",
      sizes[size],
      className
    )}>
      {header && (
        <div className="px-4 py-3 border-b border-gray-200">
          {header}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
