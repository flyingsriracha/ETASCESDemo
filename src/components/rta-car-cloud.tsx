import React, { useState } from 'react';
import { useChatAutoScroll } from '../hooks/useChatAutoScroll';

import { ETASButton } from './etas-button';
import { ChatBubble } from './chat-bubble';
import { AnimationPlaceholder } from './animation-placeholder';
import { SectionContainer } from './section-container';
import { ChatDock } from './chat-dock';
import { ArrowLeft, Send } from 'lucide-react';

interface RTACarCloudProps {
  onNavigate: (screen: string) => void;
}

export const RTACarCloud: React.FC<RTACarCloudProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    { type: 'agent' as const, message: "Welcome to the RTA-CAR Start-Kit Cloud Builder. I can help you build, configure, and deploy automotive software using the RTA-CAR platform in a cloud environment." },
  ]);
  const [inputValue, setInputValue] = useState('');

  // Auto-scroll functionality for chat
  const { messagesEndRef, chatContainerRef, scrollToBottom } = useChatAutoScroll(messages);

  const handleSend = () => {
    if (inputValue.trim()) {
      // Scroll to bottom when sending message
      setTimeout(() => scrollToBottom(), 100);
      setMessages([
        ...messages,
        { type: 'user' as const, message: inputValue },
        { type: 'agent' as const, message: "Processing your RTA-CAR build request. I'll help you configure the start-kit and prepare the cloud deployment." }
      ]);
      setInputValue('');
    }
  };

  return (
    <SectionContainer>
        <div className="h-full flex flex-col">
        
        <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 pb-0 overflow-hidden">
          {/* Left Panel - Chat */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="bg-white rounded-xl shadow-lg p-4 flex-1 flex flex-col">
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
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((msg, idx) => (
                  <ChatBubble 
                    key={idx}
                    type={msg.type} 
                    message={msg.message} 
                  />
                ))}
                
                {/* Auto-scroll anchor */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about RTA-CAR cloud building..."
                  className="flex-1 px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164293]"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-[#164293] text-white rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Panel - Animation */}
          <div className="hidden lg:flex items-start justify-center lg:w-1/2 overflow-hidden">
            <AnimationPlaceholder 
              label="ANIMATION_RTA_CAR_CLOUD"
              width={640}
              height={540}
              resizable={true}
              minWidth={400}
              minHeight={300}
            />
          </div>
        </div>

        {/* ChatDock - Fixed Bottom */}
        <ChatDock />
      </div>
      </SectionContainer>
  );
};
