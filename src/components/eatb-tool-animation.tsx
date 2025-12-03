import React from 'react';
const eatbToolImage = '/assets/images/ETAS_EATB_Digital.png';
import { FileText, Sparkles } from 'lucide-react';

export const EATBToolAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* EATB Tool Image with Animation */}
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 bg-gradient-to-r from-[#164293]/20 to-[#89037A]/20 rounded-full animate-ping" />
        </div>
        
        {/* Middle Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-r from-[#164293]/30 to-[#89037A]/30 rounded-full animate-pulse" />
        </div>
        
        {/* Tool Image Container */}
        <div className="relative z-10 flex items-center justify-center">
          <img 
            src={eatbToolImage} 
            alt="EATB Tool" 
            className="w-40 h-40 animate-pulse"
          />
          
          {/* Sparkle Effects */}
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-[#89037A] animate-bounce" strokeWidth={2} style={{ animationDelay: '0ms' }} />
          </div>
          <div className="absolute -bottom-2 -left-2">
            <Sparkles className="w-6 h-6 text-[#164293] animate-bounce" strokeWidth={2} style={{ animationDelay: '200ms' }} />
          </div>
          <div className="absolute top-2 -left-3">
            <FileText className="w-6 h-6 text-[#89037A] animate-pulse" strokeWidth={2} style={{ animationDelay: '100ms' }} />
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
          Opening EATB Tool...
        </p>
        <p className="text-[#5A646E] opacity-75">
          Initializing report generation
        </p>
      </div>
    </div>
  );
};
