import React from 'react';
import { Cloud, Wifi, Zap } from 'lucide-react';

export const ETASCloudConnectionAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* ETAS Cloud Icon with Animated Effects */}
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 bg-gradient-to-r from-[#164293]/20 to-[#89037A]/20 rounded-full animate-ping" />
        </div>
        
        {/* Middle Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-[#164293]/30 to-[#89037A]/30 rounded-full animate-pulse" />
        </div>
        
        {/* Cloud Icon Container */}
        <div className="relative z-10 flex items-center justify-center w-32 h-32">
          <Cloud className="w-20 h-20 text-[#164293] animate-pulse" strokeWidth={1.5} />
          
          {/* Connection Effects */}
          <div className="absolute -top-3 -right-3">
            <Wifi className="w-10 h-10 text-[#89037A] animate-bounce" strokeWidth={2} />
          </div>
          <div className="absolute -bottom-2 -left-2">
            <Zap className="w-8 h-8 text-[#164293] animate-pulse" strokeWidth={2} style={{ animationDelay: '200ms' }} />
          </div>
        </div>
      </div>
      
      {/* Animated Progress Dots */}
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 bg-[#164293] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2.5 h-2.5 bg-[#164293] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2.5 h-2.5 bg-[#89037A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      
      {/* Status Text */}
      <div className="text-center space-y-1">
        <p className="text-[#164293]">
          Connecting to ETAS Cloud...
        </p>
        <p className="text-[#5A646E] opacity-75">
          Powered by Microsoft Azure
        </p>
      </div>
    </div>
  );
};
