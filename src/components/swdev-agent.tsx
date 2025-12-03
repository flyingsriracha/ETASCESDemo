import React, { useState } from 'react';

import { ETASButton } from './etas-button';
import { ChatBubble } from './chat-bubble';
import { AnimationPlaceholder } from './animation-placeholder';
import { SectionContainer } from './section-container';
import { ChatDock } from './chat-dock';
import { CollapsiblePanel } from './collapsible-panel';
import { Sparkles, Box } from 'lucide-react';

interface SWDevAgentProps {
  onNavigate: (screen: string) => void;
}

export const SWDevAgent: React.FC<SWDevAgentProps> = ({ onNavigate }) => {
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);

  return (
    <SectionContainer>
        <div className="h-full flex flex-col">
        
        <div className="flex-1 flex flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4 pb-0 overflow-hidden">
          {/* Left Panel - Chat */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="bg-card rounded-xl shadow-lg p-3 flex-1 flex flex-col justify-center">
              {/* Option Buttons - Collapsible */}
              <CollapsiblePanel
                isMinimized={isPanelMinimized}
                onRestore={() => setIsPanelMinimized(false)}
                className="h-full flex items-center justify-center"
                type="options"
              >
                <div className="flex flex-col gap-2 sm:gap-3">
                  <ETASButton
                    variant="primary"
                    icon={<Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />}
                    onClick={() => onNavigate('aura-orchestrator')}
                    className="w-full"
                  >
                    Access AURA AI to get SW Development Support
                  </ETASButton>
                  
                  <ETASButton
                    variant="primary"
                    icon={<Box className="w-3 h-3 sm:w-4 sm:h-4" />}
                    onClick={() => onNavigate('rta-car-placeholder')}
                    className="w-full"
                  >
                    Build SW using the RTA-CAR Start-Kit in the Cloud
                  </ETASButton>
                </div>
              </CollapsiblePanel>
            </div>
          </div>
          
          {/* Right Panel - Animation - Collapsible */}
          <CollapsiblePanel
            isMinimized={isPanelMinimized}
            onRestore={() => setIsPanelMinimized(false)}
            className="hidden lg:flex items-start justify-center lg:w-1/2 overflow-hidden"
            type="animation"
          >
            <AnimationPlaceholder 
              label="ANIMATION_PLACEHOLDER_SWDEV"
              width={640}
              height={380}
              resizable={true}
              minWidth={400}
              minHeight={200}
            />
          </CollapsiblePanel>
        </div>

        {/* ChatDock - Fixed Bottom */}
        <ChatDock onChatActiveChange={setIsPanelMinimized} />
      </div>
      </SectionContainer>
  );
};
