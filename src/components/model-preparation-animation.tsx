import React from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';

export const ModelPreparationAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* Brain Icon with Animated Effects */}
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-[#164293]/20 to-[#89037A]/20 rounded-full animate-ping" />
        </div>
        
        {/* Middle Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-[#164293]/30 to-[#89037A]/30 rounded-full animate-pulse" />
        </div>
        
        {/* Brain Icon Container */}
        <div className="relative z-10 flex items-center justify-center w-24 h-24">
          <Brain className="w-12 h-12 text-[#164293] animate-pulse" strokeWidth={1.5} />
          
          {/* Sparkle Effects */}
          <div className="absolute top-0 right-0">
            <Sparkles className="w-5 h-5 text-[#89037A] animate-bounce" strokeWidth={2} style={{ animationDelay: '0ms' }} />
          </div>
          <div className="absolute bottom-0 left-0">
            <Sparkles className="w-4 h-4 text-[#164293] animate-bounce" strokeWidth={2} style={{ animationDelay: '200ms' }} />
          </div>
          <div className="absolute top-2 left-0">
            <Zap className="w-4 h-4 text-[#89037A] animate-pulse" strokeWidth={2} style={{ animationDelay: '100ms' }} />
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
          Okay, let me prepare the model for next steps...
        </p>
        <p className="text-[#5A646E] opacity-75">
          Initializing torque model calibration
        </p>
      </div>
    </div>
  );
};
