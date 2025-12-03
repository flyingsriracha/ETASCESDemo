import React from 'react';
const dataOperatorImage = '/assets/images/ETAS_Data_Operator_Digital.png';
import { Wifi } from 'lucide-react';

export const DataOperatorAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* Data Operator Image with Animation */}
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-r from-[#164293]/20 to-[#89037A]/20 rounded-full animate-ping" />
        </div>
        
        {/* Middle Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 bg-gradient-to-r from-[#164293]/30 to-[#89037A]/30 rounded-full animate-pulse" />
        </div>
        
        {/* Image Container */}
        <div className="relative z-10 flex items-center justify-center">
          <img 
            src={dataOperatorImage} 
            alt="Data Operator" 
            className="w-32 h-32 animate-pulse"
          />
          
          {/* WiFi Signal Overlay */}
          <div className="absolute -top-2 -right-2">
            <Wifi className="w-8 h-8 text-[#89037A] animate-bounce" strokeWidth={2} />
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
          Connecting to Data Operator...
        </p>
        <p className="text-[#5A646E] opacity-75">
          Establishing secure connection
        </p>
      </div>
    </div>
  );
};
