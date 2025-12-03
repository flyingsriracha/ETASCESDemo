import React from 'react';

import { ETASButton } from './etas-button';
import { ETASFooter } from './etas-footer';
import { SectionContainer } from './section-container';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ExternalLandingPageProps {
  onNavigate: (screen: string) => void;
}

export const ExternalLandingPage: React.FC<ExternalLandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">

      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-12 border-2 border-dashed border-[#164293]/30">
            <ExternalLink className="w-16 h-16 text-[#164293] mx-auto mb-6" />
            <h2 className="text-[#164293] mb-4">External Link Placeholder</h2>
            <p className="text-[#5A646E] mb-8">
              This is a placeholder for the ETAS-Azure Marketplace landing page. In production, 
              this would redirect to the external Azure Marketplace listing.
            </p>
            
            <div className="space-y-4">
              <a 
                href="https://azuremarketplace.microsoft.com/en-us/marketplace/apps/etas.etas-partnership"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <ETASButton variant="primary" icon={<ExternalLink className="w-5 h-5" />}>
                  Visit Azure Marketplace
                </ETASButton>
              </a>
              
              <div>
                <ETASButton 
                  variant="ghost" 
                  onClick={() => onNavigate('welcome')}
                  icon={<ArrowLeft className="w-5 h-5" />}
                >
                  Back to Welcome
                </ETASButton>
              </div>
            </div>
          </div>

          <div className="bg-[#F0F4FF] rounded-lg p-6 text-left">
            <h3 className="text-[#164293] mb-3">About ETAS Partnership on Azure</h3>
            <p className="text-sm text-[#5A646E]">
              ETAS and Microsoft Azure collaborate to provide cloud-based automotive software 
              development and calibration solutions. This partnership enables seamless integration 
              of ETAS tools with Azure's robust cloud infrastructure.
            </p>
          </div>
        </div>
      </div>

      <ETASFooter />
    </div>
  );
};
