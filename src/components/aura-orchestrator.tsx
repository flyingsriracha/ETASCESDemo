import React, { useState } from 'react';
import { useChatAutoScroll } from '../hooks/useChatAutoScroll';

import { ETASButton } from './etas-button';
import { ChatBubble } from './chat-bubble';
import { AnimationPlaceholder } from './animation-placeholder';
import { SectionContainer } from './section-container';
import { ChatDock } from './chat-dock';
import { CollapsiblePanel } from './collapsible-panel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable';
import { ArrowLeft, FileText } from 'lucide-react';

interface AURAOrchestratorProps {
  onNavigate: (screen: string) => void;
}

export const AURAOrchestrator: React.FC<AURAOrchestratorProps> = ({ onNavigate }) => {
  const [conversationStep, setConversationStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);

  // Auto-scroll functionality for chat
  const { messagesEndRef, chatContainerRef, scrollToBottom } = useChatAutoScroll([
    conversationStep, 
    isAnalyzing
  ]);

  const handleRequirementChoice = (choice: 'yes' | 'no') => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    if (choice === 'yes') {
      setIsAnalyzing(true);
      setTimeout(() => {
        setConversationStep(1);
      }, 1500);
      setTimeout(() => {
        setConversationStep(2);
      }, 3000);
      setTimeout(() => {
        setIsAnalyzing(false);
        setConversationStep(3);
      }, 4500);
    } else {
      setConversationStep(5);
    }
  };

  const handleReportChoice = (choice: 'open' | 'close') => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    if (choice === 'open') {
      setConversationStep(4);
    } else {
      onNavigate('swdev');
    }
  };

  return (
    <SectionContainer>
        <div className="h-full flex flex-col">
        
        <div className="flex-1 p-6 pb-0 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full gap-6">
            {/* Left Panel - Chat */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
                {/* Back Button */}
                <ETASButton
                  variant="ghost"
                  icon={<ArrowLeft className="w-4 h-4" />}
                  onClick={() => onNavigate('swdev')}
                  className="mb-4 w-fit"
                >
                  Back to SW Dev Agent
                </ETASButton>

                {/* Messages */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {/* Initial Question */}
                  <ChatBubble 
                    type="agent" 
                    message="Do you have a new customer requirement you'd like to analyze?" 
                  />

                  {conversationStep === 0 && !isAnalyzing && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <ETASButton
                        variant="primary"
                        onClick={() => handleRequirementChoice('yes')}
                        className="flex-1"
                      >
                        Yes, analyze requirements
                      </ETASButton>
                      <ETASButton
                        variant="ghost"
                        onClick={() => handleRequirementChoice('no')}
                        className="flex-1"
                      >
                        No, skip
                      </ETASButton>
                    </div>
                  )}

                  {/* Analysis Flow */}
                  {conversationStep >= 1 && (
                    <ChatBubble 
                      type="agent" 
                      message="I've received new requirements; performing diff analysis." 
                    />
                  )}

                  {conversationStep >= 2 && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="Generating valid BSW configuration based on new requirements." 
                      />
                      
                      {/* Code Block Visualization */}
                      <div className="bg-[#F5F5F5] border border-gray-200 rounded-lg p-4">
                        <div className="font-mono text-[14px] text-gray-800 space-y-1">
                          <div className="text-[#039C7D]">// BSW Configuration Generated</div>
                          <div><span className="text-[#164293]">module</span> = <span className="text-[#89037A]">"CAN_Interface"</span></div>
                          <div><span className="text-[#164293]">version</span> = <span className="text-[#89037A]">"2.4.1"</span></div>
                          <div><span className="text-[#164293]">dependencies</span> = [<span className="text-[#89037A]">"OS", "ComStack"</span>]</div>
                          <div className="text-[#039C7D]">// Configuration validated ✓</div>
                        </div>
                      </div>
                    </>
                  )}

                  {conversationStep >= 3 && conversationStep < 5 && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="Impact report ready — would you like to open it?" 
                      />
                      
                      {conversationStep === 3 && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <ETASButton
                            variant="primary"
                            icon={<FileText className="w-3 h-3 sm:w-4 sm:h-4" />}
                            onClick={() => handleReportChoice('open')}
                            className="flex-1 gradient-etas text-white hover:opacity-90"
                          >
                            Open Impact Report
                          </ETASButton>
                          <ETASButton
                            variant="ghost"
                            onClick={() => handleReportChoice('close')}
                            className="flex-1"
                          >
                            Close Session
                          </ETASButton>
                        </div>
                      )}
                    </>
                  )}

                  {/* Report Opened */}
                  {conversationStep === 4 && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="Impact report is now open. The analysis shows configuration changes across 12 modules, with 3 new dependencies and 5 optimized parameters. All changes have been validated against AUTOSAR standards." 
                      />
                      
                      {/* Impact Report Preview */}
                      <div className="bg-white border border-[#164293]/20 rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
                        <h3 className="text-[#164293]">Impact Analysis Summary</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                          <div className="bg-[#F0F4FF] p-3 rounded">
                            <div className="text-[#5A646E] text-sm">Modules Affected</div>
                            <div className="text-[#164293] mt-1">12</div>
                          </div>
                          <div className="bg-[#F0F4FF] p-3 rounded">
                            <div className="text-[#5A646E] text-sm">New Dependencies</div>
                            <div className="text-[#164293] mt-1">3</div>
                          </div>
                          <div className="bg-[#F0F4FF] p-3 rounded">
                            <div className="text-[#5A646E] text-sm">Optimizations</div>
                            <div className="text-[#039C7D] mt-1">5</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Skipped Flow */}
                  {conversationStep === 5 && (
                    <ChatBubble 
                      type="agent" 
                      message="Understood. You can analyze requirements whenever you're ready. AURA AI is available to assist with requirement analysis, code generation, and configuration management." 
                    />
                  )}
                  
                  {/* Auto-scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </ResizablePanel>
            
            {/* Resizable Handle */}
            <ResizableHandle withHandle className="hidden lg:flex" />
            
            {/* Right Panel - AURA Flow Animation - Collapsible */}
            <ResizablePanel defaultSize={50} minSize={30} className="hidden lg:block">
              <CollapsiblePanel
                isMinimized={isPanelMinimized}
                onRestore={() => setIsPanelMinimized(false)}
                className="h-full"
                type="animation"
              >
                <div className="h-full flex flex-col items-start justify-start overflow-hidden">
                  {conversationStep >= 1 && conversationStep <= 4 ? (
                    <div className="w-full flex flex-col gap-4">
                      <AnimationPlaceholder 
                        label="ANIMATION_AURA_FLOW"
                        width={640}
                        height={400}
                        resizable={true}
                        minWidth={400}
                        minHeight={300}
                      />
                      
                      {/* Flow Diagram Overlay */}
                      <div className="bg-white border-2 border-dashed border-[#164293]/30 rounded-lg p-3 sm:p-4">
                        <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2">
                          <div className={`flex-1 min-w-[60px] text-center p-2 sm:p-3 rounded transition-all ${conversationStep >= 1 ? 'bg-[#164293] text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <div className="text-[10px] sm:text-xs">Req Analysis</div>
                          </div>
                          <div className="text-[#164293]">→</div>
                          <div className={`flex-1 min-w-[60px] text-center p-2 sm:p-3 rounded transition-all ${conversationStep >= 1 ? 'bg-[#164293] text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <div className="text-[10px] sm:text-xs">Req Diff</div>
                          </div>
                          <div className="text-[#164293]">→</div>
                          <div className={`flex-1 min-w-[60px] text-center p-2 sm:p-3 rounded transition-all ${conversationStep >= 2 ? 'bg-[#164293] text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <div className="text-[10px] sm:text-xs">Req2Code</div>
                          </div>
                          <div className="text-[#164293]">→</div>
                          <div className={`flex-1 min-w-[60px] text-center p-2 sm:p-3 rounded transition-all ${conversationStep >= 2 ? 'bg-[#164293] text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <div className="text-[10px] sm:text-xs">Req2Config</div>
                          </div>
                          <div className="text-[#164293]">→</div>
                          <div className={`flex-1 min-w-[60px] text-center p-2 sm:p-3 rounded transition-all ${conversationStep >= 3 ? 'bg-[#89037A] text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <div className="text-[10px] sm:text-xs">ISOLAR Tool</div>
                          </div>
                          <div className="text-[#89037A]">→</div>
                          <div className={`flex-1 min-w-[60px] text-center p-2 sm:p-3 rounded transition-all ${conversationStep >= 3 ? 'bg-[#039C7D] text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <div className="text-[10px] sm:text-xs">BSW Gen</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <AnimationPlaceholder 
                      label="ANIMATION_AURA_FLOW"
                      width={640}
                      height={540}
                      resizable={true}
                      minWidth={400}
                      minHeight={300}
                    />
                  )}
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
