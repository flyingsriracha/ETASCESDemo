import React from 'react';
import { FileCode, Cpu, Database, GitBranch } from 'lucide-react';

export const FMUProcessingAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* Central Processing Icon */}
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-r from-[#164293]/20 to-[#89037A]/20 rounded-full animate-ping" />
        </div>
        
        {/* Middle Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 bg-gradient-to-r from-[#164293]/30 to-[#89037A]/30 rounded-full animate-pulse" />
        </div>
        
        {/* File Icon Container */}
        <div className="relative z-10 flex items-center justify-center w-40 h-40 bg-gradient-to-br from-[#164293] to-[#89037A] rounded-full">
          <FileCode className="w-20 h-20 text-white animate-pulse" strokeWidth={1.5} />
        </div>
        
        {/* Orbiting Processing Nodes */}
        <div className="absolute inset-0 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <Cpu className="w-8 h-8 text-[#164293] animate-pulse" strokeWidth={2} />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <Database className="w-8 h-8 text-[#89037A] animate-pulse" strokeWidth={2} />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -left-8">
            <GitBranch className="w-8 h-8 text-[#164293] animate-pulse" strokeWidth={2} />
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full max-w-sm">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#164293] to-[#89037A] rounded-full animate-pulse" 
               style={{ width: '100%' }} 
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
          Processing FMU File...
        </p>
        <p className="text-[#5A646E] opacity-75">
          Parsing model structure and dependencies
        </p>
      </div>
    </div>
  );
};
