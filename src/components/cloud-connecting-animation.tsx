import React from 'react';
import { Cloud, Wifi } from 'lucide-react';

export const CloudConnectingAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      {/* Cloud and WiFi Icon Container */}
      <div className="relative">
        {/* Pulsing Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-[#164293]/10 rounded-full animate-ping" />
        </div>
        
        {/* Cloud Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <Cloud className="w-16 h-16 text-[#164293] animate-pulse" strokeWidth={1.5} />
          
          {/* WiFi Signal Overlay */}
          <div className="absolute bottom-0 right-0">
            <Wifi className="w-6 h-6 text-[#89037A] animate-bounce" strokeWidth={2} />
          </div>
        </div>
      </div>
      
      {/* Animated Dots */}
      <div className="flex gap-1.5">
        <div className="w-2 h-2 bg-[#164293] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-[#164293] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-[#164293] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      
      {/* Connection Text */}
      <div className="text-center">
        <p className="text-[#5A646E]">Establishing secure connection...</p>
      </div>
    </div>
  );
};
