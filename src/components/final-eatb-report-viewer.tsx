import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
const finalReport1 = '/assets/images/report-placeholder.svg';
const finalReport2 = '/assets/images/report-placeholder.svg';

interface FinalEATBReportViewerProps {
  onClose?: () => void;
}

export const FinalEATBReportViewer: React.FC<FinalEATBReportViewerProps> = ({ onClose }) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[#164293]">EATB Final Optimization Report</h3>
            <p className="text-[#5A646E] opacity-75">Post-ASCMO Neural Network Optimization</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close report"
            >
              <X className="w-5 h-5 text-[#5A646E]" />
            </button>
          )}
        </div>

        {/* Images Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-auto">
          {/* Report Image 1 - Torque Measure vs Predicted */}
          <button
            onClick={() => setFullscreenImage(finalReport1)}
            className="relative group bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-[#164293] transition-all cursor-zoom-in"
          >
            <img
              src={finalReport1}
              alt="EATB Final Report - Torque Measure vs Predicted with Error Histogram"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3 shadow-lg">
                <ZoomIn className="w-6 h-6 text-[#164293]" />
              </div>
            </div>
          </button>

          {/* Report Image 2 - Time Series */}
          <button
            onClick={() => setFullscreenImage(finalReport2)}
            className="relative group bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-[#164293] transition-all cursor-zoom-in"
          >
            <img
              src={finalReport2}
              alt="EATB Final Report - Time Series Analysis"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3 shadow-lg">
                <ZoomIn className="w-6 h-6 text-[#164293]" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
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
            alt="EATB Final Report Fullscreen"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
