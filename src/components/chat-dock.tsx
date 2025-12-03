import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, GripHorizontal, MessageCircle, X } from 'lucide-react';
import { cn } from './ui/utils';
import { ChatSettingsModal } from './chat-settings-modal';
import { Resizable } from 're-resizable';

interface ChatDockProps {
  className?: string;
  onChatActiveChange?: (isActive: boolean) => void;
}

export const ChatDock: React.FC<ChatDockProps> = ({ className, onChatActiveChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant'; text: string }>>(([
    { type: 'assistant', text: 'Hello, how can I assist you today?' },
    { type: 'user', text: 'Show me the calibration workflow.' },
  ]));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatHeight, setChatHeight] = useState(200);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatLogRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleChatFocus = () => {
    if (!isChatActive) {
      setIsChatActive(true);
      onChatActiveChange?.(true);
    }
  };

  const handleChatBlur = () => {
    // Don't immediately deactivate - wait for message send
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { type: 'user' as const, text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate assistant response after 300ms
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'assistant', text: '(assistant reply placeholder)' }]);
      // Keep panels minimized after response
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Note: Removed non-functional useImperativeHandle that was using React.useRef() incorrectly
  // If imperative handle is needed, component should be wrapped with forwardRef

  // If not expanded, show minimized icon
  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsExpanded(true)}
          className="relative bg-primary hover:opacity-90 text-primary-foreground p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          {/* Notification badge if there are unread messages */}
          {messages.length > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ChatDock Container - Fixed position when expanded */}
      <div className="fixed bottom-4 right-4 z-40 w-[400px] max-w-[calc(100vw-2rem)]">
        <Resizable
          size={{ width: '100%', height: chatHeight }}
          onResizeStop={(e, direction, ref, d) => {
            setChatHeight(chatHeight + d.height);
          }}
          minHeight={150}
          maxHeight={600}
          enable={{
            top: true,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false
          }}
          handleStyles={{
            top: {
              top: 0,
              height: '24px',
              cursor: 'ns-resize',
              zIndex: 20
            }
          }}
          handleComponent={{
            top: (
              <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center group cursor-ns-resize">
                <div className="w-12 h-1 bg-[#CDD0D3] rounded-full group-hover:bg-[#164293] transition-colors" />
              </div>
            )
          }}
          className={cn(
            "bg-white rounded-xl shadow-lg relative transition-all duration-200",
            isChatActive && "shadow-xl ring-2 ring-[#164293]/20",
            className
          )}
        >
          <div className="h-full flex flex-col p-4 pt-8">
            {/* Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-10 w-5 h-5 text-[#5A646E] hover:text-[#164293] transition-colors z-10"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Settings Icon */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="absolute top-4 right-4 w-5 h-5 text-[#5A646E] hover:text-[#164293] transition-colors z-10"
              aria-label="Chat Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* ChatLog Section - flex column with justify-end to anchor to bottom */}
            <div 
              ref={chatLogRef}
              className="flex-1 overflow-y-auto mb-3 pr-8 flex flex-col justify-end"
            >
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "px-3 py-2 rounded-lg max-w-[80%] transition-all duration-250 shadow-sm",
                      message.type === 'assistant'
                        ? "bg-[#FAFAFA] border border-[#EEEFF0]"
                        : "bg-[#F1FAFE] ml-auto"
                    )}
                  >
                    <p className="text-[#5A646E]">{message.text}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Row */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleChatFocus}
                onBlur={handleChatBlur}
                onKeyPress={handleKeyPress}
                placeholder="Ask the agent…"
                className="flex-1 h-9 px-3 py-2 border border-[#CDD0D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164293] focus:border-transparent shadow-sm transition-all duration-200"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={cn(
                  "h-9 px-4 rounded-lg transition-all duration-200 shadow-sm",
                  inputValue.trim()
                    ? "bg-gradient-to-r from-[#164293] to-[#89037A] text-white hover:from-[#123571] hover:to-[#6f0265] hover:shadow-md"
                    : "bg-[#CDD0D3] text-[#5A646E] cursor-not-allowed"
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Resizable>
      </div>

      <ChatSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};
