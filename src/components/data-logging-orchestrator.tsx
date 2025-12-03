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

interface DataLoggingOrchestratorProps {
  onNavigate: (screen: string) => void;
}

export const DataLoggingOrchestrator: React.FC<DataLoggingOrchestratorProps> = ({ onNavigate }) => {
  const [conversationStep, setConversationStep] = useState(0);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);

  // Auto-scroll functionality for chat
  const { messagesEndRef, chatContainerRef, scrollToBottom } = useChatAutoScroll([
    conversationStep, 
    isRetrieving
  ]);

  const handleConnectChoice = (choice: 'yes' | 'no') => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    if (choice === 'yes') {
      setIsRetrieving(true);
      setTimeout(() => {
        setIsRetrieving(false);
        setConversationStep(1);
      }, 2500);
    } else {
      setConversationStep(3);
    }
  };

  const handleDashboardChoice = (choice: 'open' | 'close') => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    if (choice === 'open') {
      setConversationStep(2);
    } else {
      onNavigate('calibration');
    }
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
                    message="Connect to customer cloud and pull latest fleet data?" 
                  />

                  {conversationStep === 0 && !isRetrieving && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <ETASButton
                        variant="primary"
                        onClick={() => handleConnectChoice('yes')}
                        className="flex-1"
                      >
                        Yes
                      </ETASButton>
                      <ETASButton
                        variant="ghost"
                        onClick={() => handleConnectChoice('no')}
                        className="flex-1"
                      >
                        No
                      </ETASButton>
                    </div>
                  )}

                  {/* Retrieving State */}
                  {isRetrieving && (
                    <ChatBubble 
                      type="agent" 
                      message="Retrieving data and parsing for EATB report…" 
                    />
                  )}

                  {/* Report Ready */}
                  {conversationStep >= 1 && conversationStep < 3 && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="Report ready. Would you like to open EATB dashboard?" 
                      />
                      
                      {conversationStep === 1 && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <ETASButton
                            variant="primary"
                            onClick={() => handleDashboardChoice('open')}
                            className="flex-1"
                          >
                            Open Dashboard
                          </ETASButton>
                          <ETASButton
                            variant="ghost"
                            onClick={() => handleDashboardChoice('close')}
                            className="flex-1"
                          >
                            Close Session
                          </ETASButton>
                        </div>
                      )}
                    </>
                  )}

                  {/* Dashboard Opened */}
                  {conversationStep === 2 && (
                    <ChatBubble 
                      type="agent" 
                      message="EATB dashboard is now open. You can analyze fleet performance metrics, view telemetry trends, and generate detailed reports. All data has been successfully synchronized from the customer cloud." 
                    />
                  )}

                  {/* Declined Flow */}
                  {conversationStep === 3 && (
                    <ChatBubble 
                      type="agent" 
                      message="Understood. You can connect to the customer cloud whenever you're ready to analyze fleet data." 
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
                    label="ANIMATION_DATA_LOGGING_FLOW"
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
