import React, { useState } from 'react';
import { cn } from './ui/utils';
import { ETASAvatar } from './etas-avatar';
import { MessageCircle, X } from 'lucide-react';

type AgentType = 'welcome' | 'calibration' | 'swdev' | 'aura';

interface AgentSelectorProps {
  onAgentSelect: (agent: AgentType) => void;
  activeAgent: AgentType | null;
}

export const AgentSelector: React.FC<AgentSelectorProps> = ({ onAgentSelect, activeAgent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const agents: Array<{ type: AgentType; label: string; description: string }> = [
    { type: 'welcome', label: 'Welcome', description: 'General assistant' },
    { type: 'calibration', label: 'Calibration', description: 'Data & Analytics' },
    { type: 'swdev', label: 'SW Dev', description: 'Software development' },
    { type: 'aura', label: 'AURA AI', description: 'AI assistant' },
  ];

  const handleAgentClick = (agent: AgentType) => {
    onAgentSelect(agent);
    setIsExpanded(false); // Collapse after selection
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {/* Minimized Icon */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="relative bg-primary hover:opacity-90 text-primary-foreground p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Open agent selector"
        >
          <MessageCircle className="w-6 h-6" />
          {activeAgent && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </button>
      )}

      {/* Expanded Agent Bubbles */}
      {isExpanded && (
        <div className="flex flex-col gap-3 items-start">
          {/* Close Button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="bg-card hover:bg-muted border border-border text-foreground p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 self-end"
            aria-label="Close agent selector"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Agent Bubbles */}
          {agents.map((agent) => (
            <div key={agent.type} className="relative group">
              <button
                onClick={() => handleAgentClick(agent.type)}
                className={cn(
                  "relative transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full",
                  activeAgent === agent.type && "ring-2 ring-primary ring-offset-2 scale-110"
                )}
                aria-label={`Chat with ${agent.label}`}
              >
                <ETASAvatar type={agent.type} size={48} />
                {/* Active indicator */}
                {activeAgent === agent.type && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>

              {/* Tooltip */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <div className="bg-card border border-border rounded-lg shadow-lg px-3 py-2 whitespace-nowrap">
                  <p className="text-sm font-semibold text-foreground">{agent.label}</p>
                  <p className="text-xs text-muted-foreground">{agent.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


