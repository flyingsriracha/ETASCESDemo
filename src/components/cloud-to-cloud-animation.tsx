import React from 'react';
import { Cloud, ArrowRight, Database } from 'lucide-react';

export const CloudToCloudAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* Cloud to Cloud Connection */}
      <div className="flex items-center justify-center gap-4">
        {/* ETAS Cloud (Left) */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-[#164293]/20 rounded-full animate-pulse" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <Cloud className="w-16 h-16 text-[#164293] animate-pulse" strokeWidth={1.5} />
            <p className="text-[#164293] text-xs">ETAS Cloud</p>
          </div>
        </div>
        
        {/* Animated Data Transfer Arrow */}
        <div className="relative flex items-center gap-1">
          {/* Moving Data Packets */}
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-[#164293] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-[#89037A] rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
            <div className="w-2 h-2 bg-[#164293] rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
          </div>
          <ArrowRight className="w-8 h-8 text-[#89037A] animate-pulse" strokeWidth={2} />
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-[#89037A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            <div className="w-2 h-2 bg-[#164293] rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
            <div className="w-2 h-2 bg-[#89037A] rounded-full animate-bounce" style={{ animationDelay: '500ms' }} />
          </div>
        </div>
        
        {/* Customer Cloud (Right) */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-[#89037A]/20 rounded-full animate-pulse" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <Cloud className="w-16 h-16 text-[#89037A] animate-pulse" strokeWidth={1.5} />
            <p className="text-[#89037A] text-xs">Customer Cloud</p>
          </div>
        </div>
      </div>
      
      {/* Data Transfer Indicator */}
      <div className="flex items-center gap-2">
        <Database className="w-5 h-5 text-[#164293] animate-pulse" />
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#164293] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#164293] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#89037A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
      
      {/* Status Text */}
      <div className="text-center space-y-1">
        <p className="text-[#164293]">
          Connecting to Customer Cloud...
        </p>
        <p className="text-[#5A646E] opacity-75">
          Transferring data from last 24 hours
        </p>
      </div>
    </div>
  );
};
