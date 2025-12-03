import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from './ui/utils';

interface ChatBubbleEnhancedProps {
  type: 'user' | 'agent';
  message: string;
  className?: string;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  timestamp?: string;
  agentType?: 'welcome' | 'calibration' | 'swdev' | 'aura';
}

export const ChatBubbleEnhanced: React.FC<ChatBubbleEnhancedProps> = ({ 
  type, 
  message, 
  className,
  showAvatar = true,
  showTimestamp = false,
  timestamp,
  agentType = 'welcome',
}) => {
  const agentColors = {
    welcome: 'bg-[#164293]',
    calibration: 'bg-[#039C7D]',
    swdev: 'bg-[#89037A]',
    aura: 'bg-gradient-to-r from-[#164293] to-[#89037A]',
  };

  return (
    <div className={cn("flex gap-4 items-start", className)}>
      {/* Avatar */}
      {showAvatar && (
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
          type === 'agent' ? agentColors[agentType] : "bg-[#89037A]"
        )}>
          {type === 'agent' ? (
            <Bot className="w-6 h-6 text-white" />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </div>
      )}
      
      {/* Message */}
      <div className="flex-1">
        <div className={cn(
          "px-5 py-4 rounded-lg",
          type === 'agent' 
            ? "bg-white border border-gray-200" 
            : "bg-[#F0F4FF] border border-[#164293]/20"
        )}>
          <p className="text-[#5A646E]">{message}</p>
        </div>
        
        {/* Timestamp */}
        {showTimestamp && timestamp && (
          <div className="mt-1 text-xs text-gray-400 ml-1">
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};
