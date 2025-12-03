import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from './ui/utils';

interface ChatBubbleProps {
  type: 'user' | 'agent';
  message: string;
  className?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  type, 
  message, 
  className 
}) => {
  return (
    <div className={cn("flex gap-3 items-start", className)}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        type === 'agent' ? "bg-primary" : "bg-secondary"
      )}>
        {type === 'agent' ? (
          <Bot className="w-5 h-5 text-primary-foreground" />
        ) : (
          <User className="w-5 h-5 text-secondary-foreground" />
        )}
      </div>
      
      {/* Message */}
      <div className={cn(
        "flex-1 px-3 py-2 rounded-lg",
        type === 'agent' 
          ? "bg-card border border-border" 
          : "bg-muted border border-primary/20"
      )}>
        <p className="text-foreground">{message}</p>
      </div>
    </div>
  );
};
