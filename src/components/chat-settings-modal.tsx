import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from './ui/utils';

interface ChatSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatSettingsModal: React.FC<ChatSettingsModalProps> = ({ isOpen, onClose }) => {
  const [streamUrl, setStreamUrl] = useState('/api/chat');
  const [syncUrl, setSyncUrl] = useState('/api/chat-sync');
  const [modelName, setModelName] = useState('Phi-4-mini-reasoning');

  const handleSave = () => {
    // Placeholder save action
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="gradient-etas px-6 py-4 flex items-center justify-between">
          <h2 className="text-white">Chat Settings</h2>
          <button
            onClick={onClose}
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Proxy Stream URL */}
          <div>
            <label className="block mb-1.5 text-foreground">
              Proxy (stream) URL
            </label>
            <input
              type="text"
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
              className="w-full h-9 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Proxy Sync URL */}
          <div>
            <label className="block mb-1.5 text-foreground">
              Proxy (sync) URL
            </label>
            <input
              type="text"
              value={syncUrl}
              onChange={(e) => setSyncUrl(e.target.value)}
              className="w-full h-9 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Model Name */}
          <div>
            <label className="block mb-1.5 text-foreground">
              Model Name
            </label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full h-9 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Warning Note */}
          <div className="pt-2">
            <p className="text-destructive">
              ⚠️ Design-only placeholder. No secrets in Figma.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="h-10 px-6 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-10 px-6 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
