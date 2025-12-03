// Settings Panel - Main settings modal with tabbed interface
import React, { useState } from 'react';
import { X, Settings as SettingsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ThemeTab } from './settings/theme-tab';
import { AppTab } from './settings/app-tab';
import { LayoutTab } from './settings/layout-tab';
import { ImportExportTab } from './settings/import-export-tab';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState('theme');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-[800px] max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="gradient-etas px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-white" />
            <h2 className="text-white text-xl font-semibold">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabbed Content */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="import-export">Import/Export</TabsTrigger>
            </TabsList>

            <div className="max-h-[calc(90vh-180px)] overflow-y-auto pr-2">
              <TabsContent value="theme">
                <ThemeTab />
              </TabsContent>

              <TabsContent value="application">
                <AppTab />
              </TabsContent>

              <TabsContent value="layout">
                <LayoutTab />
              </TabsContent>

              <TabsContent value="import-export">
                <ImportExportTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#164293] text-white hover:bg-[#123571] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

