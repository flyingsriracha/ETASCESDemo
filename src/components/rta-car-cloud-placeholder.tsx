import React from 'react';

import { ETASButton } from './etas-button';
import { ETASFooter } from './etas-footer';
import { SectionContainer } from './section-container';
import { ArrowLeft, Cloud, Box } from 'lucide-react';

interface RTACarCloudPlaceholderProps {
  onNavigate: (screen: string) => void;
}

export const RTACarCloudPlaceholder: React.FC<RTACarCloudPlaceholderProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">

      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-12 border-2 border-dashed border-[#164293]/30">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Box className="w-12 h-12 text-[#164293]" />
              <Cloud className="w-12 h-12 text-[#89037A]" />
            </div>
            
            <h2 className="text-[#164293] mb-4">RTA-CAR Cloud Start-Kit</h2>
            <p className="text-[#5A646E] mb-8">
              This is a placeholder for the RTA-CAR cloud-based software building interface. 
              In production, this would provide access to the RTA-CAR Start-Kit environment 
              for automotive software development and deployment.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#F0F4FF] p-4 rounded-lg">
                <h4 className="text-[#164293] mb-2">Cloud Build</h4>
                <p className="text-sm text-[#5A646E]">Build automotive software in the cloud</p>
              </div>
              <div className="bg-[#F0F4FF] p-4 rounded-lg">
                <h4 className="text-[#164293] mb-2">RTA-CAR Kit</h4>
                <p className="text-sm text-[#5A646E]">Pre-configured development environment</p>
              </div>
              <div className="bg-[#F0F4FF] p-4 rounded-lg">
                <h4 className="text-[#164293] mb-2">Auto Deploy</h4>
                <p className="text-sm text-[#5A646E]">Automated deployment pipeline</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <ETASButton 
                variant="primary" 
                icon={<Cloud className="w-5 h-5" />}
              >
                Launch Cloud Environment (Coming Soon)
              </ETASButton>
              
              <div className="flex gap-4 justify-center">
                <ETASButton 
                  variant="ghost" 
                  onClick={() => onNavigate('swdev')}
                  icon={<ArrowLeft className="w-5 h-5" />}
                >
                  Back to SW Dev Agent
                </ETASButton>
                
                <ETASButton 
                  variant="ghost" 
                  onClick={() => onNavigate('welcome')}
                >
                  Back to Welcome
                </ETASButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ETASFooter />
    </div>
  );
};
