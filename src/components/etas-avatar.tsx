import React from 'react';
import { Bot, Gauge, Code2, Sparkles } from 'lucide-react';
import { cn } from './ui/utils';

interface ETASAvatarProps {
  type: 'welcome' | 'calibration' | 'swdev' | 'aura';
  size?: 48 | 64;
  className?: string;
}

export const ETASAvatar: React.FC<ETASAvatarProps> = ({
  type,
  size = 48,
  className,
}) => {
  const avatarConfig = {
    welcome: {
      icon: Bot,
      color: 'bg-primary',
    },
    calibration: {
      icon: Gauge,
      color: 'bg-success',
    },
    swdev: {
      icon: Code2,
      color: 'bg-secondary',
    },
    aura: {
      icon: Sparkles,
      color: 'bg-gradient-to-br from-primary to-secondary',
    },
  };

  const config = avatarConfig[type];
  const Icon = config.icon;
  const iconSize = size === 64 ? 32 : 24;

  return (
    <div 
      className={cn(
        "rounded-full flex items-center justify-center flex-shrink-0",
        config.color,
        className
      )}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Icon className="text-white" style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
    </div>
  );
};
