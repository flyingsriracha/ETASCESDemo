import { useEffect, useRef } from 'react';

/**
 * Custom hook for auto-scrolling chat containers to the bottom
 * @param dependency - The dependency that triggers auto-scroll (usually messages array or conversation step)
 * @param delay - Optional delay before scrolling (default: 100ms)
 */
export const useChatAutoScroll = (dependency: any, delay: number = 100) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
    
    // Fallback: scroll the container directly
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, delay);

    return () => clearTimeout(timer);
  }, [dependency, delay]);

  // Return refs and scroll function for manual use
  return {
    messagesEndRef,
    chatContainerRef,
    scrollToBottom
  };
};