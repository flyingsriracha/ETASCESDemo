import React, { useState } from 'react';
import { useChatAutoScroll } from '../hooks/useChatAutoScroll';

import { ETASButton } from './etas-button';
import { ChatBubble } from './chat-bubble';
import { AnimationPlaceholder } from './animation-placeholder';
import { SectionContainer } from './section-container';
import { ChatDock } from './chat-dock';
import { CollapsiblePanel } from './collapsible-panel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable';
import { ArrowLeft } from 'lucide-react';

interface VirtualCalibrationOrchestratorProps {
  onNavigate: (screen: string) => void;
}

export const VirtualCalibrationOrchestrator: React.FC<VirtualCalibrationOrchestratorProps> = ({ onNavigate }) => {
  const [conversationStep, setConversationStep] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);

  // Auto-scroll functionality for chat
  const { messagesEndRef, chatContainerRef, scrollToBottom } = useChatAutoScroll([
    conversationStep, 
    isBuilding
  ]);

  const handleBuildChoice = (choice: 'yes' | 'skip') => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    if (choice === 'yes') {
      setIsBuilding(true);
      setTimeout(() => {
        setIsBuilding(false);
        setConversationStep(1);
      }, 2000);
    } else {
      setConversationStep(3);
    }
  };

  const handleSendChoice = (choice: 'yes' | 'no') => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    setConversationStep(2);
  };

  return (
    <SectionContainer>
        <div className="h-full flex flex-col">
        
        <div className="flex-1 p-4 sm:p-6 pb-0 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full gap-4 sm:gap-6">
            {/* Left Panel - Chat */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
                {/* Back Button */}
                <ETASButton
                  variant="ghost"
                  icon={<ArrowLeft className="w-4 h-4" />}
                  onClick={() => onNavigate('calibration')}
                  className="mb-4 w-fit"
                >
                  Back to Calibration Agent
                </ETASButton>

                {/* Messages */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {/* Initial Question */}
                  <ChatBubble 
                    type="agent" 
                    message="Would you like me to build a Type-3 Virtual ECU FMU based on latest SW?" 
                  />

                  {conversationStep === 0 && !isBuilding && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <ETASButton
                        variant="primary"
                        onClick={() => handleBuildChoice('yes')}
                        className="flex-1"
                      >
                        Yes, Build FMU
                      </ETASButton>
                      <ETASButton
                        variant="ghost"
                        onClick={() => handleBuildChoice('skip')}
                        className="flex-1"
                      >
                        Skip
                      </ETASButton>
                    </div>
                  )}

                  {/* Building State */}
                  {isBuilding && (
                    <ChatBubble 
                      type="agent" 
                      message="Building Type-3 Virtual ECU FMU from latest software package…" 
                    />
                  )}

                  {/* FMU Generated */}
                  {conversationStep >= 1 && conversationStep < 3 && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="FMU generated successfully. Send to third-party simulation engine?" 
                      />
                      
                      {conversationStep === 1 && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <ETASButton
                            variant="primary"
                            onClick={() => handleSendChoice('yes')}
                            className="flex-1"
                          >
                            Yes, Send
                          </ETASButton>
                          <ETASButton
                            variant="ghost"
                            onClick={() => handleSendChoice('no')}
                            className="flex-1"
                          >
                            No
                          </ETASButton>
                        </div>
                      )}
                    </>
                  )}

                  {/* Opening Connections */}
                  {conversationStep >= 2 && (
                    <ChatBubble 
                      type="agent" 
                      message="Opening INCA and EHANDBOOK connections… Establishing secure links to calibration and measurement tools. Virtual ECU environment is now ready for testing." 
                    />
                  )}

                  {/* Skipped Flow */}
                  {conversationStep === 3 && (
                    <ChatBubble 
                      type="agent" 
                      message="Understood. You can return to build the FMU at any time when needed." 
                    />
                  )}
                  
                  {/* Auto-scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </ResizablePanel>
            
            {/* Resizable Handle */}
            <ResizableHandle withHandle className="hidden lg:flex" />
            
            {/* Right Panel - Animation - Collapsible */}
            <ResizablePanel defaultSize={50} minSize={30} className="hidden lg:block">
              <CollapsiblePanel
                isMinimized={isPanelMinimized}
                onRestore={() => setIsPanelMinimized(false)}
                className="h-full"
                type="animation"
              >
                <div className="h-full flex items-start justify-center overflow-hidden">
                  <AnimationPlaceholder 
                    label="ANIMATION_VIRTUAL_CAL_FLOW"
                    width={640}
                    height={540}
                    resizable={true}
                    minWidth={400}
                    minHeight={300}
                  />
                </div>
              </CollapsiblePanel>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* ChatDock - Fixed Bottom */}
        <ChatDock onChatActiveChange={setIsPanelMinimized} />
      </div>
      </SectionContainer>
  );
};
