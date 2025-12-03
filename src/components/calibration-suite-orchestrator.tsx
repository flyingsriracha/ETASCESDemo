import React, { useState } from 'react';
import { useChatAutoScroll } from '../hooks/useChatAutoScroll';

import { ETASButton } from './etas-button';
import { ChatBubble } from './chat-bubble';
import { AnimationPlaceholder } from './animation-placeholder';
import { SectionContainer } from './section-container';
import { ChatDock } from './chat-dock';
import { ArrowLeft } from 'lucide-react';
import { CloudConnectingAnimation } from './cloud-connecting-animation';
import { ModelPreparationAnimation } from './model-preparation-animation';
import { DataOperatorAnimation } from './data-operator-animation';
import { CloudToCloudAnimation } from './cloud-to-cloud-animation';
import { ETASCloudConnectionAnimation } from './etas-cloud-connection-animation';
import { EATBToolAnimation } from './eatb-tool-animation';
import { EATBReportViewer } from './eatb-report-viewer';
import { EATBReportModal } from './eatb-report-modal';
import { ASCMOConnectionAnimation } from './ascmo-connection-animation';
import { NeuralNetworkOptimizationAnimation } from './neural-network-optimization-animation';
import { ReportGenerationAnimation } from './report-generation-animation';
import { FinalEATBReportViewer } from './final-eatb-report-viewer';
import { FMUUpload } from './fmu-upload';
import { FMUProcessingAnimation } from './fmu-processing-animation';
import { CompatibilityAssessmentAnimation } from './compatibility-assessment-animation';
import { ModelRefactoringAnimation } from './model-refactoring-animation';
import { X, ZoomIn } from 'lucide-react';

// Image paths - files must be in public/assets/images/
// In Vite, files in public/ are served from root, so /assets/images/ works
const torqueAscmoImage = '/assets/images/TorqueAscmo.png';
const torqueModelOptImage = '/assets/images/TorqueModel_opt.jpg';

interface CalibrationSuiteOrchestratorProps {
  onNavigate: (screen: string) => void;
}

export const CalibrationSuiteOrchestrator: React.FC<CalibrationSuiteOrchestratorProps> = ({ onNavigate }) => {
  const [conversationStep, setConversationStep] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isConnectingDataOperator, setIsConnectingDataOperator] = useState(false);
  const [isConnectingCustomerCloud, setIsConnectingCustomerCloud] = useState(false);
  const [isConnectingETASCloud, setIsConnectingETASCloud] = useState(false);
  const [isOpeningEATB, setIsOpeningEATB] = useState(false);
  const [showEATBReport, setShowEATBReport] = useState(false);
  const [showEATBReportModal, setShowEATBReportModal] = useState(false);
  const [showPostOptReportModal, setShowPostOptReportModal] = useState(false);
  const [isConnectingASCMO, setIsConnectingASCMO] = useState(false);
  const [isOptimizingNN, setIsOptimizingNN] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [showFinalReport, setShowFinalReport] = useState(false);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  
  // New Activity Flow States
  const [isNewActivityFlow, setIsNewActivityFlow] = useState(false);
  const [newActivityStep, setNewActivityStep] = useState(0);

  // Auto-scroll functionality for chat
  const { messagesEndRef, chatContainerRef, scrollToBottom } = useChatAutoScroll([
    conversationStep, 
    isConnecting, 
    isPreparing, 
    isConnectingDataOperator,
    isConnectingCustomerCloud,
    isConnectingETASCloud,
    isOpeningEATB,
    isConnectingASCMO,
    isOptimizingNN,
    isGeneratingReport,
    newActivityStep,
    isNewActivityFlow
  ]);
  const [isProcessingFMU, setIsProcessingFMU] = useState(false);
  const [isAssessingCompatibility, setIsAssessingCompatibility] = useState(false);
  const [isRefactoringModel, setIsRefactoringModel] = useState(false);

  const handleTorqueChoice = (choice: 'continue' | 'new') => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    if (choice === 'continue') {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setConversationStep(1);
      }, 5000);
    } else {
      // Start new activity flow
      setIsNewActivityFlow(true);
      setNewActivityStep(1); // Show FMU upload prompt
    }
  };

  const handleModelConfirmation = (choice: 'continue' | 'load-new') => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    if (choice === 'continue') {
      setIsPreparing(true);
      setTimeout(() => {
        setIsPreparing(false);
        setConversationStep(2);
      }, 3000);
    } else {
      // Load new model logic here
      setIsPreparing(true);
      setTimeout(() => {
        setIsPreparing(false);
        setConversationStep(2);
      }, 3000);
    }
  };

  const handleDataPullChoice = (choice: 'yes' | 'no') => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    if (choice === 'yes') {
      // Step 1: Connect to Data Operator (5 seconds)
      setIsConnectingDataOperator(true);
      setTimeout(() => {
        setIsConnectingDataOperator(false);
        // Step 2: Connect to Customer Cloud (5 seconds)
        setIsConnectingCustomerCloud(true);
        setTimeout(() => {
          setIsConnectingCustomerCloud(false);
          // Step 3: Show feedback message
          setConversationStep(3);
          // Step 4: Wait 5 seconds, then Connect to ETAS Cloud (5 seconds)
          setTimeout(() => {
            setIsConnectingETASCloud(true);
            setTimeout(() => {
              setIsConnectingETASCloud(false);
              // Step 5: Open EATB Tool (5 seconds)
              setIsOpeningEATB(true);
              setTimeout(() => {
                setIsOpeningEATB(false);
                // Show EATB options
                setConversationStep(4);
              }, 5000);
            }, 5000);
          }, 5000);
        }, 5000);
      }, 5000);
    } else {
      // If user clicks "No", skip animations
      setConversationStep(3);
    }
  };

  const handleEATBChoice = (choice: 'view-report' | 'optimize') => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    if (choice === 'view-report') {
      // Open modal instead of inline report
      setShowEATBReportModal(true);
      // Keep conversationStep at 4 so buttons remain visible when modal closes
    } else {
      // Start ASCMO optimization flow
      // Step 1: Connect to ASCMO (5 seconds)
      setIsConnectingASCMO(true);
      setTimeout(() => {
        setIsConnectingASCMO(false);
        // Step 2: Neural Network Optimization (10 seconds)
        setIsOptimizingNN(true);
        setTimeout(() => {
          setIsOptimizingNN(false);
          // Step 3: Show completion prompt
          setConversationStep(6);
        }, 10000);
      }, 5000);
    }
  };

  const handleOptimizationComplete = () => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    // Generate report animation (5 seconds)
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      // Show final report
      setShowFinalReport(true);
      setConversationStep(7);
    }, 5000);
  };

  const handleNewOptimization = () => {
    // Navigate back to Calibration Agent
    onNavigate('calibration');
  };

  const handleFinish = () => {
    // Show thank you message then navigate to welcome
    setConversationStep(8);
    setTimeout(() => {
      onNavigate('welcome');
    }, 2000);
  };

  // New Activity Flow Handlers
  const handleFMUUpload = (fileName: string) => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    // Step 1: Process FMU (5 seconds)
    setIsProcessingFMU(true);
    setNewActivityStep(2);
    setTimeout(() => {
      setIsProcessingFMU(false);
      // Step 2: Show compatibility assessment message
      setNewActivityStep(3);
      // Step 3: Run compatibility assessment animation (5 seconds)
      setTimeout(() => {
        setIsAssessingCompatibility(true);
        setTimeout(() => {
          setIsAssessingCompatibility(false);
          // Step 4: Show refactoring prompt
          setNewActivityStep(4);
        }, 5000);
      }, 100);
    }, 5000);
  };

  const handleRefactorProceed = () => {
    // Scroll to bottom when button is clicked
    setTimeout(() => scrollToBottom(), 100);
    
    // Step 5: Refactor model animation (5 seconds)
    setIsRefactoringModel(true);
    setTimeout(() => {
      setIsRefactoringModel(false);
      // Step 6: Show completion message
      setNewActivityStep(5);
    }, 5000);
  };

  return (
    <>
    <SectionContainer>
        <div className="h-full flex flex-col">
        
        <div className="flex-1 p-3 sm:p-4 pb-0 overflow-hidden">
          <div className="h-full flex justify-center">
            {/* Chat Panel - 80% width, responsive */}
            <div className="w-full max-w-[80%] h-full">
              <div className="bg-white rounded-xl shadow-lg p-3 h-full flex flex-col">
                {/* Back Button */}
                <ETASButton
                  variant="ghost"
                  icon={<ArrowLeft className="w-4 h-4" />}
                  onClick={() => onNavigate('calibration')}
                  className="mb-3 w-fit"
                >
                  Back to Calibration Agent
                </ETASButton>

                {/* Messages */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 mb-3">
                  {/* Initial Question */}
                  <ChatBubble 
                    type="agent" 
                    message="Welcome back, would you like to continue with the Torque model?" 
                  />

                  {conversationStep === 0 && !isConnecting && !isNewActivityFlow && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <ETASButton
                        variant="primary"
                        onClick={() => handleTorqueChoice('continue')}
                        className="flex-1"
                      >
                        Continue with Torque Model
                      </ETASButton>
                      <ETASButton
                        variant="ghost"
                        onClick={() => handleTorqueChoice('new')}
                        className="flex-1"
                      >
                        Start new Activity
                      </ETASButton>
                    </div>
                  )}

                  {/* NEW ACTIVITY FLOW */}
                  {/* Step 1: FMU Upload Prompt */}
                  {isNewActivityFlow && newActivityStep === 1 && !isProcessingFMU && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="Please upload your new model as an FMU (Functional Mock-up Unit) file." 
                      />
                      <div className="flex gap-3 items-start pl-11">
                        <div className="flex-1">
                          <FMUUpload onFileUploaded={handleFMUUpload} />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 2: FMU Processing Animation */}
                  {isProcessingFMU && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <FMUProcessingAnimation />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Compatibility Assessment Message */}
                  {isNewActivityFlow && newActivityStep >= 3 && !isAssessingCompatibility && newActivityStep < 4 && (
                    <ChatBubble 
                      type="agent" 
                      message="Compatibility assessment is now running." 
                    />
                  )}

                  {/* Step 3: Compatibility Assessment Animation */}
                  {isAssessingCompatibility && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <CompatibilityAssessmentAnimation />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Refactoring Prompt */}
                  {isNewActivityFlow && newActivityStep === 4 && !isRefactoringModel && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="The variables and parameters need to be re-factored for optimal compatibility with the Calibration Software Suite." 
                      />
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <ETASButton
                          variant="primary"
                          onClick={handleRefactorProceed}
                          className="w-full"
                        >
                          Yes Proceed
                        </ETASButton>
                      </div>
                    </>
                  )}

                  {/* Step 5: Model Refactoring Animation */}
                  {isRefactoringModel && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <ModelRefactoringAnimation />
                      </div>
                    </div>
                  )}

                  {/* Step 6: Completion Message */}
                  {isNewActivityFlow && newActivityStep === 5 && (
                    <ChatBubble 
                      type="agent" 
                      message="The model has been uploaded successfully! Your new project can now commence using the Calibration Software Suite." 
                    />
                  )}

                  {/* Connecting State */}
                  {isConnecting && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="Connecting to ETAS Cloud powered by Microsoft Azure" 
                      />
                      <div className="flex gap-3 items-start pl-11">
                        <div className="flex-1">
                          <CloudConnectingAnimation />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Model Ready - Only show in Continue flow */}
                  {!isNewActivityFlow && conversationStep >= 1 && !isPreparing && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="Welcome back User, I have pre-loaded the Torque Model you, please confirm this is the right model" 
                      />
                      
                      {/* Torque Model Images - Thumbnails */}
                      <div className="flex gap-3 items-start pl-11">
                        <div className="flex gap-3">
                          {/* Torque ASCMO Image */}
                          <button
                            onClick={() => setFullscreenImage(torqueAscmoImage)}
                            className="relative group bg-white border border-gray-200 rounded-lg p-3 max-w-md hover:border-primary transition-all cursor-zoom-in overflow-hidden"
                          >
                            <img 
                              src={torqueAscmoImage} 
                              alt="Torque ASCMO Model" 
                              className="w-full h-auto object-contain"
                              style={{ display: 'block' }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.border = '2px solid red';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center rounded-lg pointer-events-none">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2 shadow-lg">
                                <ZoomIn className="w-5 h-5 text-primary" />
                              </div>
                            </div>
                          </button>
                          
                          {/* Torque Model Optimized Image */}
                          <button
                            onClick={() => setFullscreenImage(torqueModelOptImage)}
                            className="relative group bg-white border border-gray-200 rounded-lg p-3 max-w-md hover:border-primary transition-all cursor-zoom-in overflow-hidden"
                          >
                            <img 
                              src={torqueModelOptImage} 
                              alt="Torque Model Optimized" 
                              className="w-full h-auto object-contain"
                              style={{ display: 'block' }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.border = '2px solid red';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center rounded-lg pointer-events-none">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2 shadow-lg">
                                <ZoomIn className="w-5 h-5 text-primary" />
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                      
                      {conversationStep === 1 && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <ETASButton
                            variant="primary"
                            onClick={() => handleModelConfirmation('continue')}
                            className="flex-1"
                          >
                            Yes continue with Torque Model
                          </ETASButton>
                          <ETASButton
                            variant="ghost"
                            onClick={() => handleModelConfirmation('load-new')}
                            className="flex-1"
                          >
                            Load new Torque Model
                          </ETASButton>
                        </div>
                      )}
                    </>
                  )}

                  {/* Preparing Model State */}
                  {!isNewActivityFlow && isPreparing && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <ModelPreparationAnimation />
                      </div>
                    </div>
                  )}

                  {/* Data Pull Question */}
                  {!isNewActivityFlow && conversationStep === 2 && !isConnectingDataOperator && !isConnectingCustomerCloud && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="Would you like me to pull all relevant data from the Customer Cloud from the last 24 hours?" 
                      />
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <ETASButton
                          variant="primary"
                          onClick={() => handleDataPullChoice('yes')}
                          className="flex-1"
                        >
                          Yes Proceed
                        </ETASButton>
                        <ETASButton
                          variant="ghost"
                          onClick={() => handleDataPullChoice('no')}
                          className="flex-1"
                        >
                          No
                        </ETASButton>
                      </div>
                    </>
                  )}

                  {/* Connecting to Data Operator */}
                  {!isNewActivityFlow && isConnectingDataOperator && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <DataOperatorAnimation />
                      </div>
                    </div>
                  )}

                  {/* Connecting to Customer Cloud */}
                  {!isNewActivityFlow && isConnectingCustomerCloud && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <CloudToCloudAnimation />
                      </div>
                    </div>
                  )}

                  {/* Data Received Feedback */}
                  {!isNewActivityFlow && conversationStep >= 3 && (
                    <ChatBubble 
                      type="agent" 
                      message="I have received the last 24 hours of data from the customer cloud and parsed it using Data Operator. I will now generate an EATB Report." 
                    />
                  )}

                  {/* Connecting to ETAS Cloud */}
                  {!isNewActivityFlow && isConnectingETASCloud && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <ETASCloudConnectionAnimation />
                      </div>
                    </div>
                  )}

                  {/* Opening EATB Tool */}
                  {!isNewActivityFlow && isOpeningEATB && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <EATBToolAnimation />
                      </div>
                    </div>
                  )}

                  {/* EATB Options */}
                  {!isNewActivityFlow && conversationStep === 4 && !isOpeningEATB && !isConnectingASCMO && !isOptimizingNN && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="EATB Tool is now ready. What would you like to do next?" 
                      />
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <ETASButton
                          variant="primary"
                          onClick={() => handleEATBChoice('view-report')}
                          className="w-full"
                        >
                          View EATB Pre-Optimization Report
                        </ETASButton>
                        <ETASButton
                          variant="ghost"
                          onClick={() => handleEATBChoice('optimize')}
                          className="w-full"
                        >
                          Proceed to Optimize Model using Neural Network in ASCMO-AI
                        </ETASButton>
                      </div>
                    </>
                  )}

                  {/* Connecting to ASCMO */}
                  {!isNewActivityFlow && isConnectingASCMO && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <ASCMOConnectionAnimation />
                      </div>
                    </div>
                  )}

                  {/* Neural Network Optimization */}
                  {!isNewActivityFlow && isOptimizingNN && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <NeuralNetworkOptimizationAnimation />
                      </div>
                    </div>
                  )}

                  {/* Optimization Complete Prompt */}
                  {!isNewActivityFlow && conversationStep === 6 && !isOptimizingNN && !isGeneratingReport && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="I have optimized the model using the neural networks of ASCMO-AI, do you want to see the final report in EATB?" 
                      />
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <ETASButton
                          variant="primary"
                          onClick={handleOptimizationComplete}
                          className="w-full"
                        >
                          Yes Proceed
                        </ETASButton>
                      </div>
                    </>
                  )}

                  {/* Generating Report */}
                  {!isNewActivityFlow && isGeneratingReport && (
                    <div className="flex gap-3 items-start pl-11">
                      <div className="flex-1">
                        <ReportGenerationAnimation />
                      </div>
                    </div>
                  )}

                  {/* Final Report Message */}
                  {!isNewActivityFlow && conversationStep === 7 && (
                    <>
                      <ChatBubble 
                        type="agent" 
                        message="Report generation complete! Here are your final EATB optimization results with improved model accuracy." 
                      />
                      <ChatBubble 
                        type="agent" 
                        message="Do you want to start a new optimization?" 
                      />
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <ETASButton
                          variant="primary"
                          onClick={() => setShowPostOptReportModal(true)}
                          className="w-full"
                        >
                          View EATB Post-Optimization Report
                        </ETASButton>
                        <ETASButton
                          variant="primary"
                          onClick={handleNewOptimization}
                          className="w-full"
                        >
                          Yes, start new Optimization
                        </ETASButton>
                        <ETASButton
                          variant="ghost"
                          onClick={handleFinish}
                          className="w-full"
                        >
                          Finished, Please close
                        </ETASButton>
                      </div>
                    </>
                  )}

                  {/* Thank You Message */}
                  {!isNewActivityFlow && conversationStep === 8 && (
                    <ChatBubble 
                      type="agent" 
                      message="Thank you, have a good day!" 
                    />
                  )}
                  
                  {/* Auto-scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ChatDock - Fixed Bottom */}
        <ChatDock onChatActiveChange={setIsPanelMinimized} />
      </div>
      </SectionContainer>

      {/* EATB Pre-Optimization Report Modal */}
      <EATBReportModal
        isOpen={showEATBReportModal}
        onClose={() => setShowEATBReportModal(false)}
        reportUrl="/reports/EATB_preOpt_standalone.html?chapter=Chapter&section=Section"
        showComparisonLinks={false}
      />

      {/* EATB Post-Optimization Report Modal - with comparison links */}
      <EATBReportModal
        isOpen={showPostOptReportModal}
        onClose={() => setShowPostOptReportModal(false)}
        reportUrl="/reports/EATB_results_PostOpt.html"
        showComparisonLinks={true}
        preOptReportUrl="/reports/EATB_preOpt_standalone.html?chapter=Chapter&section=Section"
        postOptReportUrl="/reports/EATB_results_PostOpt.html"
      />

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
