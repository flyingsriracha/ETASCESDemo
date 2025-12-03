import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EATBReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportUrl: string;
  showComparisonLinks?: boolean; // Only show for post-optimization modal
  preOptReportUrl?: string;
  postOptReportUrl?: string;
}

export const EATBReportModal: React.FC<EATBReportModalProps> = ({ 
  isOpen, 
  onClose, 
  reportUrl: initialReportUrl,
  showComparisonLinks = false,
  preOptReportUrl = '/reports/EATB_preOpt_standalone.html?chapter=Chapter&section=Section',
  postOptReportUrl = '/reports/EATB_results_PostOpt.html'
}) => {
  const [currentReportUrl, setCurrentReportUrl] = useState(initialReportUrl);

  // Update report URL when modal opens or initialReportUrl changes
  React.useEffect(() => {
    setCurrentReportUrl(initialReportUrl);
  }, [initialReportUrl, isOpen]);

  if (!isOpen) return null;

  const handlePreOptClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentReportUrl(preOptReportUrl);
  };

  const handlePostOptClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentReportUrl(postOptReportUrl);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-[95vw] h-[95vh] max-w-[98vw] min-w-[320px] sm:min-w-[640px] flex flex-col m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="gradient-etas px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-xl flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <h2 className="text-white font-semibold text-base sm:text-lg whitespace-nowrap">EATB Report</h2>
            {showComparisonLinks && (
              <div className="flex items-center gap-2 sm:gap-3 ml-auto mr-4">
                <button
                  onClick={handlePreOptClick}
                  className={`text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    currentReportUrl === preOptReportUrl 
                      ? 'bg-white/30 font-semibold' 
                      : 'hover:bg-white/20'
                  }`}
                  aria-label="View Pre-Optimization Report"
                >
                  Pre-Optimization
                </button>
                <span className="text-white/60">|</span>
                <button
                  onClick={handlePostOptClick}
                  className={`text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    currentReportUrl === postOptReportUrl 
                      ? 'bg-white/30 font-semibold' 
                      : 'hover:bg-white/20'
                  }`}
                  aria-label="View Post-Optimization Report"
                >
                  Post-Optimization
                </button>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close report"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Report Content */}
        <div className="flex-1 overflow-auto min-h-0">
          <iframe
            src={currentReportUrl}
            className="w-full h-full min-h-[500px] border-0"
            title="EATB Report"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            style={{ width: '100%', minWidth: '100%' }}
            key={currentReportUrl} // Force reload when URL changes
          />
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-border bg-gray-50 flex items-center justify-between flex-shrink-0">
          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
            Click outside the window to close
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-[50px] hover:opacity-90 transition-opacity text-sm sm:text-base w-full sm:w-auto"
            style={{ borderRadius: '50px' }}
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};


