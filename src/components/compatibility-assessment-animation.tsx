import React from 'react';
import { CheckCircle2, AlertCircle, Shield, Zap } from 'lucide-react';

export const CompatibilityAssessmentAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* Central Shield Icon */}
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-44 h-44 bg-gradient-to-r from-[#164293]/20 to-[#89037A]/20 rounded-full animate-ping" />
        </div>
        
        {/* Middle Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-36 h-36 bg-gradient-to-r from-[#164293]/30 to-[#89037A]/30 rounded-full animate-pulse" />
        </div>
        
        {/* Shield Icon Container */}
        <div className="relative z-10 flex items-center justify-center w-36 h-36 bg-gradient-to-br from-[#164293] to-[#89037A] rounded-full">
          <Shield className="w-18 h-18 text-white animate-pulse" strokeWidth={1.5} />
        </div>
        
        {/* Check Marks */}
        <div className="absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '0ms' }}>
          <CheckCircle2 className="w-8 h-8 text-[#039C7D]" strokeWidth={2} />
        </div>
        <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: '200ms' }}>
          <Zap className="w-7 h-7 text-[#FCCD22]" strokeWidth={2} />
        </div>
        <div className="absolute top-1/4 -left-4 animate-bounce" style={{ animationDelay: '400ms' }}>
          <AlertCircle className="w-6 h-6 text-[#164293]" strokeWidth={2} />
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
          Running Compatibility Assessment...
        </p>
        <p className="text-[#5A646E] opacity-75">
          Validating model interfaces and dependencies
        </p>
      </div>
    </div>
  );
};
