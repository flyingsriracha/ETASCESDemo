import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from './ui/utils';
import { ETASAvatar } from './etas-avatar';

type AgentType = 'welcome' | 'calibration' | 'swdev' | 'aura';

interface FloatingChatProps {
  isOpen: boolean;
  onClose: () => void;
  activeAgent: AgentType;
}

export const FloatingChat: React.FC<FloatingChatProps> = ({ isOpen, onClose, activeAgent }) => {
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant'; text: string; agent: AgentType }>>([
    { type: 'assistant', text: 'Hello! How can I assist you today?', agent: activeAgent },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  // Update greeting when agent changes
  useEffect(() => {
    if (isOpen) {
      const agentNames = {
        welcome: 'Welcome Agent',
        calibration: 'Calibration Agent',
        swdev: 'SW Development Agent',
        aura: 'AURA AI Agent',
      };
      setMessages([{
        type: 'assistant',
        text: `Hello! I'm the ${agentNames[activeAgent]}. How can I help you?`,
        agent: activeAgent,
      }]);
    }
  }, [activeAgent, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { type: 'user' as const, text: inputValue, agent: activeAgent };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate assistant response after 500ms
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        text: `I received your message: "${inputValue}". This is a demo response from the ${activeAgent} agent.`,
        agent: activeAgent,
      }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 bg-card rounded-xl shadow-2xl border border-border transition-all duration-300 z-40",
        isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
      )}
    >
      {/* Header */}
      <div className="gradient-etas px-4 py-3 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ETASAvatar type={activeAgent} size={48} className="w-8 h-8" />
          <span className="text-white font-semibold">
            {activeAgent === 'welcome' && 'Welcome Agent'}
            {activeAgent === 'calibration' && 'Calibration Agent'}
            {activeAgent === 'swdev' && 'SW Dev Agent'}
            {activeAgent === 'aura' && 'AURA AI'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-white/20 p-1.5 rounded transition-colors"
            aria-label={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1.5 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="h-[380px] overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-2 items-start",
                  msg.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {msg.type === 'assistant' && (
                  <ETASAvatar type={msg.agent} size={48} className="w-6 h-6 flex-shrink-0" />
                )}
                <div
                  className={cn(
                    "px-3 py-2 rounded-lg max-w-[70%]",
                    msg.type === 'assistant'
                      ? "bg-card border border-border"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-primary text-primary-foreground p-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


