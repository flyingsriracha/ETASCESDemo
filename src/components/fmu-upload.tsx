import React, { useRef, useState } from 'react';
import { Upload, File, CheckCircle2 } from 'lucide-react';
import { ETASButton } from './etas-button';

interface FMUUploadProps {
  onFileUploaded: (fileName: string) => void;
}

export const FMUUpload: React.FC<FMUUploadProps> = ({ onFileUploaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File | null) => {
    if (file && file.name.endsWith('.fmu')) {
      setSelectedFile(file.name);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUploaded(selectedFile);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-[#164293] bg-[#164293]/5'
            : 'border-gray-300 bg-gray-50'
        }`}
      >
        <Upload className="w-12 h-12 text-[#5A646E] mx-auto mb-4" strokeWidth={1.5} />
        <p className="text-[#164293] mb-2">
          Drop your FMU file here or click to browse
        </p>
        <p className="text-[#5A646E] opacity-75 mb-4">
          Supported format: .fmu (Functional Mock-up Unit)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".fmu"
          onChange={handleInputChange}
          className="hidden"
        />
        <ETASButton
          variant="ghost"
          onClick={() => fileInputRef.current?.click()}
        >
          Browse Files
        </ETASButton>
      </div>

      {/* Selected File */}
      {selectedFile && (
        <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <File className="w-5 h-5 text-[#164293]" />
            <div>
              <p className="text-[#164293]">{selectedFile}</p>
              <p className="text-[#5A646E] opacity-75">Ready to upload</p>
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-[#039C7D]" />
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && (
        <ETASButton
          variant="primary"
          onClick={handleUpload}
          className="w-full"
        >
          Upload and Process FMU
        </ETASButton>
      )}
    </div>
  );
};
