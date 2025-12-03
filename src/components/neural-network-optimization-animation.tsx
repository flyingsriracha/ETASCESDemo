import React from 'react';
import { Brain, Cpu, Network, TrendingUp } from 'lucide-react';

export const NeuralNetworkOptimizationAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* Neural Network Visualization */}
      <div className="relative w-full max-w-md">
        {/* Central Brain Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative">
            {/* Outer Pulsing Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-r from-[#164293]/20 to-[#89037A]/20 rounded-full animate-ping" />
            </div>
            
            {/* Middle Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-[#164293]/30 to-[#89037A]/30 rounded-full animate-pulse" />
            </div>
            
            {/* Brain Icon */}
            <div className="relative z-10 flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#164293] to-[#89037A] rounded-full">
              <Brain className="w-16 h-16 text-white animate-pulse" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        
        {/* Orbiting Network Nodes */}
        <div className="absolute inset-0 flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
          {/* Node 1 */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <Network className="w-8 h-8 text-[#164293] animate-pulse" strokeWidth={2} style={{ animationDelay: '0ms' }} />
          </div>
          {/* Node 2 */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <Cpu className="w-8 h-8 text-[#89037A] animate-pulse" strokeWidth={2} style={{ animationDelay: '200ms' }} />
          </div>
          {/* Node 3 */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-8">
            <TrendingUp className="w-8 h-8 text-[#164293] animate-pulse" strokeWidth={2} style={{ animationDelay: '400ms' }} />
          </div>
          {/* Node 4 */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-8">
            <Network className="w-8 h-8 text-[#89037A] animate-pulse" strokeWidth={2} style={{ animationDelay: '600ms' }} />
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full max-w-sm">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#164293] to-[#89037A] rounded-full animate-pulse" 
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
          Optimizing Complex Models with AI Neural Networks...
        </p>
        <p className="text-[#5A646E] opacity-75">
          Training deep learning algorithms on calibration data
        </p>
      </div>
    </div>
  );
};
