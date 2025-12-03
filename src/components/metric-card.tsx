import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from './ui/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  signal?: 'success' | 'error' | 'warning' | 'neutral';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  delta,
  deltaLabel,
  signal = 'neutral',
  className,
}) => {
  const signalColors = {
    success: 'text-[#039C7D] bg-[#039C7D]/10',
    error: 'text-[#E5004A] bg-[#E5004A]/10',
    warning: 'text-[#FCCD22] bg-[#FCCD22]/10',
    neutral: 'text-[#5A646E] bg-gray-100',
  };

  const getDeltaIcon = () => {
    if (delta === undefined) return null;
    if (delta > 0) return <TrendingUp className="w-4 h-4" />;
    if (delta < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getDeltaColor = () => {
    if (delta === undefined) return '';
    if (delta > 0) return 'text-[#039C7D]';
    if (delta < 0) return 'text-[#E5004A]';
    return 'text-[#5A646E]';
  };

  return (
    <div className={cn(
      "bg-white rounded-lg border border-gray-200 p-6",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[#5A646E] mb-2">{title}</p>
          <p className="text-3xl text-[#164293] mb-2">{value}</p>
          
          {delta !== undefined && (
            <div className={cn("flex items-center gap-1 text-sm", getDeltaColor())}>
              {getDeltaIcon()}
              <span>{Math.abs(delta)}%</span>
              {deltaLabel && <span className="text-gray-500 ml-1">{deltaLabel}</span>}
            </div>
          )}
        </div>
        
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          signalColors[signal]
        )}>
          <div className={cn("w-3 h-3 rounded-full", signal === 'success' ? 'bg-[#039C7D]' : signal === 'error' ? 'bg-[#E5004A]' : signal === 'warning' ? 'bg-[#FCCD22]' : 'bg-[#5A646E]')} />
        </div>
      </div>
    </div>
  );
};
