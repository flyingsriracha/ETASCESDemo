import React, { useState } from 'react';
import { ConfigProvider } from './context/ConfigContext';
import { ETASHeader } from './components/etas-header';
import { WelcomeAgent } from './components/welcome-agent';
import { CalibrationAgent } from './components/calibration-agent';
import { SWDevAgent } from './components/swdev-agent';
import { CalibrationSuiteOrchestrator } from './components/calibration-suite-orchestrator';
import { VirtualCalibrationOrchestrator } from './components/virtual-calibration-orchestrator';
import { DataLoggingOrchestrator } from './components/data-logging-orchestrator';
import { AURAOrchestrator } from './components/aura-orchestrator';
import { RTACarCloud } from './components/rta-car-cloud';
import { ComponentLibrary } from './components/component-library';
import { ExternalLandingPage } from './components/external-landing-page';
import { RTACarCloudPlaceholder } from './components/rta-car-cloud-placeholder';

type Screen = 
  | 'welcome' 
  | 'calibration' 
  | 'swdev' 
  | 'calibration-suite' 
  | 'virtual-calibration' 
  | 'data-logging' 
  | 'aura-orchestrator' 
  | 'rta-car-cloud'
  | 'component-library'
  | 'external-landing'
  | 'rta-car-placeholder';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleNavigate = (screen: string) => {
    // Prevent scroll jump when navigating
    const currentScrollY = window.scrollY;
    setCurrentScreen(screen as Screen);
    
    // Restore scroll position after navigation
    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 0);
  };

  return (
    <ConfigProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <ETASHeader onNavigate={handleNavigate} />
        <div className="pt-20">
          {currentScreen === 'welcome' && (
            <WelcomeAgent onNavigate={handleNavigate} />
          )}
        
        {currentScreen === 'calibration' && (
          <CalibrationAgent onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'swdev' && (
          <SWDevAgent onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'calibration-suite' && (
          <CalibrationSuiteOrchestrator onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'virtual-calibration' && (
          <VirtualCalibrationOrchestrator onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'data-logging' && (
          <DataLoggingOrchestrator onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'aura-orchestrator' && (
          <AURAOrchestrator onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'rta-car-cloud' && (
          <RTACarCloud onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'component-library' && (
          <ComponentLibrary onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'external-landing' && (
          <ExternalLandingPage onNavigate={handleNavigate} />
        )}
        
          {currentScreen === 'rta-car-placeholder' && (
            <RTACarCloudPlaceholder onNavigate={handleNavigate} />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}