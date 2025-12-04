import React, { useState } from 'react';

import { ETASButton } from './etas-button';
import { ChatBubble } from './chat-bubble';
import { AnimationPlaceholder } from './animation-placeholder';
import { SectionContainer } from './section-container';
import { ChatDock } from './chat-dock';
import { CollapsiblePanel } from './collapsible-panel';
import { FloatingChat } from './floating-chat';
import { AgentSelector } from './agent-selector';
import { Globe, Gauge, Code2 } from 'lucide-react';

type AgentType = 'welcome' | 'calibration' | 'swdev' | 'aura';

interface WelcomeAgentProps {
  onNavigate: (screen: string) => void;
}

export const WelcomeAgent: React.FC<WelcomeAgentProps> = ({ onNavigate }) => {
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<AgentType | null>(null);

  const handleAgentSelect = (agent: AgentType) => {
    if (activeAgent === agent && isChatOpen) {
      // If clicking the same agent, close chat
      setIsChatOpen(false);
      setActiveAgent(null);
    } else {
      // Open chat with new agent
      setActiveAgent(agent);
      setIsChatOpen(true);
    }
  };

  return (
    <>
      <SectionContainer>
        <div className="h-full flex flex-col gap-0">
        
        <div className="flex-[0.5] flex flex-col px-2 pt-2 pb-0 overflow-hidden">
          <div className="bg-card rounded-[15px] shadow-lg p-4 flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
            {/* Option Buttons - Collapsible */}
            <CollapsiblePanel
              isMinimized={isPanelMinimized}
              onRestore={() => setIsPanelMinimized(false)}
              className="h-full flex items-center justify-center"
              type="options"
            >
              <div className="grid grid-cols-2 gap-4 w-full">
                <ETASButton
                  variant="primary"
                  icon={<Globe className="w-5 h-5" />}
                  onClick={() => onNavigate('external-landing')}
                  className="py-4"
                >
                  View the ETAS-Azure Marketplace Landing Page
                </ETASButton>
                
                <ETASButton
                  variant="primary"
                  icon={<Gauge className="w-5 h-5" />}
                  onClick={() => onNavigate('calibration')}
                  className="py-4"
                >
                  Talk to Calibration & Data Analytics Agent
                </ETASButton>
                
                <ETASButton
                  variant="primary"
                  icon={<Code2 className="w-5 h-5" />}
                  onClick={() => window.open('https://etas-aurabeta.azurewebsites.net/', '_blank')}
                  className="col-span-2 py-4"
                >
                  Talk to SW Development Agent
                </ETASButton>
              </div>
            </CollapsiblePanel>
          </div>
        </div>

        {/* ChatDock - Hidden, replaced with floating chat */}
      </div>
      </SectionContainer>
      
      {/* Agent Selector - Bottom Left - Hidden for now */}
      {/* <AgentSelector onAgentSelect={handleAgentSelect} activeAgent={activeAgent} /> */}
      
      {/* Floating Chat Window */}
      {isChatOpen && activeAgent && (
        <FloatingChat
          isOpen={isChatOpen}
          onClose={() => {
            setIsChatOpen(false);
            setActiveAgent(null);
          }}
          activeAgent={activeAgent}
        />
      )}
    </>
  );
};
