import React from 'react';
import { Sparkles, Zap } from 'lucide-react';
const ascmoImage = '/assets/images/ETAS_ASCMO_Digital.png';

export const ASCMOConnectionAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* ASCMO Image with Animated Effects */}
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 bg-gradient-to-r from-[#164293]/20 to-[#89037A]/20 rounded-full animate-ping" />
        </div>
        
        {/* Middle Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-r from-[#164293]/30 to-[#89037A]/30 rounded-full animate-pulse" />
        </div>
        
        {/* ASCMO Image Container */}
        <div className="relative z-10 flex items-center justify-center">
          <img 
            src={ascmoImage} 
            alt="ASCMO AI" 
            className="w-44 h-44 animate-pulse"
          />
          
          {/* Sparkle Effects */}
          <div className="absolute -top-3 -right-3">
            <Sparkles className="w-10 h-10 text-[#89037A] animate-bounce" strokeWidth={2} style={{ animationDelay: '0ms' }} />
          </div>
          <div className="absolute -bottom-3 -left-3">
            <Zap className="w-8 h-8 text-[#164293] animate-bounce" strokeWidth={2} style={{ animationDelay: '200ms' }} />
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
          Connecting to ASCMO-AI...
        </p>
        <p className="text-[#5A646E] opacity-75">
          Initializing Neural Network Engine
        </p>
      </div>
    </div>
  );
};
