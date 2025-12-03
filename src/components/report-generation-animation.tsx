import React from 'react';
import { FileText, Sparkles, CheckCircle2, BarChart3 } from 'lucide-react';

export const ReportGenerationAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* Report Icon with Animated Effects */}
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-r from-[#164293]/20 to-[#89037A]/20 rounded-full animate-ping" />
        </div>
        
        {/* Middle Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 bg-gradient-to-r from-[#164293]/30 to-[#89037A]/30 rounded-full animate-pulse" />
        </div>
        
        {/* Document Icon Container */}
        <div className="relative z-10 flex items-center justify-center w-40 h-40 bg-gradient-to-br from-[#164293] to-[#89037A] rounded-full">
          <FileText className="w-20 h-20 text-white animate-pulse" strokeWidth={1.5} />
        </div>
        
        {/* Floating Icons */}
        <div className="absolute -top-4 -right-4 animate-bounce" style={{ animationDelay: '0ms' }}>
          <BarChart3 className="w-10 h-10 text-[#89037A]" strokeWidth={2} />
        </div>
        <div className="absolute -bottom-4 -left-4 animate-bounce" style={{ animationDelay: '200ms' }}>
          <CheckCircle2 className="w-10 h-10 text-[#039C7D]" strokeWidth={2} />
        </div>
        <div className="absolute top-4 -left-6 animate-bounce" style={{ animationDelay: '400ms' }}>
          <Sparkles className="w-8 h-8 text-[#164293]" strokeWidth={2} />
        </div>
      </div>
      
      {/* Progress Bar with Gradient */}
      <div className="w-full max-w-sm">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#164293] to-[#89037A] rounded-full animate-pulse transition-all duration-1000"
            style={{ 
              width: '100%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
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
          Generating EATB Report...
        </p>
        <p className="text-[#5A646E] opacity-75">
          Compiling optimization results and metrics
        </p>
      </div>
    </div>
  );
};
