import React, { useState } from 'react';

import { ETASButton } from './etas-button';
import { ChatBubble } from './chat-bubble';
import { SectionContainer } from './section-container';
import { ChatDock } from './chat-dock';
import { CollapsiblePanel } from './collapsible-panel';
import { Gauge, Database } from 'lucide-react';

interface CalibrationAgentProps {
  onNavigate: (screen: string) => void;
}

export const CalibrationAgent: React.FC<CalibrationAgentProps> = ({ onNavigate }) => {
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);

  return (
    <SectionContainer>
        <div className="h-full flex flex-col">
        
        <div className="flex-1 flex flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4 pb-0 overflow-hidden">
          {/* Left Panel - Chat */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="bg-card rounded-xl shadow-lg p-3 pb-1.5 flex-1 flex flex-col justify-center">
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
                    icon={<Gauge className="w-3 h-3 sm:w-4 sm:h-4" />}
                    onClick={() => onNavigate('calibration-suite')}
                    className="w-full"
                  >
                    Initiate AI Calibration Suite
                  </ETASButton>
                  
                  <ETASButton
                    variant="primary"
                    icon={<Database className="w-3 h-3 sm:w-4 sm:h-4" />}
                    onClick={() => onNavigate('data-logging')}
                    className="w-full"
                  >
                    Analyze Data from Fleet Loggers
                  </ETASButton>
                </div>
              </CollapsiblePanel>
            </div>
          </div>
        </div>

        {/* ChatDock - Fixed Bottom */}
        <ChatDock onChatActiveChange={setIsPanelMinimized} />
      </div>
      </SectionContainer>
  );
};
