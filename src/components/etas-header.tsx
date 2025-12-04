import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { SettingsPanel } from './settings-panel';

// Real assets from Figma export
const azureLogo = '/assets/images/azure-logo.png';
const etasLogo = '/assets/images/ETAS_Logo_White.svg';

interface ETASHeaderProps {
  title?: string;
  onNavigate?: (screen: string) => void;
}

export const ETASHeader: React.FC<ETASHeaderProps> = ({ 
  title = "ETAS CES Demonstrator",
  onNavigate
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="gradient-etas w-full h-24 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      {/* ETAS Logo and Azure branding - Left aligned */}
      <div className="flex items-center gap-4" style={{ paddingLeft: '0px', paddingTop: '0px' }}>
        <button
          onClick={() => onNavigate?.('welcome')}
          className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded transition-opacity hover:opacity-80"
          aria-label="Go to home"
        >
          <img 
            src={etasLogo}
            alt="ETAS Logo"
            className="h-8 cursor-pointer"
            style={{
              width: 'auto',
              maxHeight: '32px',
              filter: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.15))',
            }}
          />
        </button>
        
        {/* Vertical divider */}
        <div className="h-10 w-px bg-white/30"></div>
        
        {/* Azure branding */}
        <div className="flex items-center gap-2">
          <img 
            src={azureLogo}
            alt="Azure"
            className="h-11"
            style={{
              width: 'auto',
              maxHeight: '45px',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>
      </div>
      
      {/* Title - Centered - 25% larger font, responsive */}
      <h1 className="text-white absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap px-4 text-[20px] sm:text-[22px] md:text-[23px] lg:text-[24px]">
        ETAS AI and Cloudification: Transforming the Automotive Ecosystem
      </h1>
      
      {/* Actions - Right aligned */}
      <div className="flex items-center gap-3">
        {/* Settings Button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open settings"
          title="Settings"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>

    {/* Settings Panel */}
    <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
