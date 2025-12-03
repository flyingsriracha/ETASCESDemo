// Import/Export Tab - Configuration import/export UI
import React, { useRef, useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Label } from '../ui/label';
import { Download, Upload, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';

export function ImportExportTab() {
  const { exportConfiguration, importConfiguration, resetToDefaults } = useConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleExport = () => {
    try {
      exportConfiguration();
      setStatus({
        type: 'success',
        message: 'Configuration exported successfully!',
      });
      setTimeout(() => setStatus({ type: null, message: '' }), 3000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to export configuration',
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importConfiguration(file);
      setStatus({
        type: 'success',
        message: 'Configuration imported successfully! Reloading...',
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to import configuration',
      });
    }

    // Reset input
    event.target.value = '';
  };

  const handleReset = () => {
    if (
      confirm(
        'Are you sure you want to reset all settings to defaults? This action cannot be undone.'
      )
    ) {
      resetToDefaults();
      setStatus({
        type: 'success',
        message: 'Settings reset to defaults!',
      });
      setTimeout(() => setStatus({ type: null, message: '' }), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Message */}
      {status.type && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg ${
            status.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="text-sm">{status.message}</span>
        </div>
      )}

      {/* Export Configuration */}
      <div>
        <Label className="mb-3 block">Export Configuration</Label>
        <p className="text-sm text-gray-600 mb-4">
          Download your current configuration as a JSON file. This file can be shared with others
          or used to restore your settings later.
        </p>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-[#164293] text-white rounded-lg hover:bg-[#123571] transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Configuration
        </button>
      </div>

      {/* Import Configuration */}
      <div>
        <Label className="mb-3 block">Import Configuration</Label>
        <p className="text-sm text-gray-600 mb-4">
          Upload a previously exported configuration file to restore settings. The page will reload
          to apply the new configuration.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleImportClick}
          className="flex items-center gap-2 px-4 py-2 border-2 border-[#164293] text-[#164293] rounded-lg hover:bg-[#164293] hover:text-white transition-colors"
        >
          <Upload className="w-4 h-4" />
          Import Configuration
        </button>
      </div>

      {/* Reset to Defaults */}
      <div>
        <Label className="mb-3 block">Reset to Defaults</Label>
        <p className="text-sm text-gray-600 mb-4">
          Reset all settings to the default ETAS configuration. This action cannot be undone.
        </p>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
      </div>

      {/* Configuration Info */}
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
        <Label className="block mb-2">About Configuration Files</Label>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            Configuration files contain all your customized settings including theme colors,
            typography, API endpoints, feature flags, and layout preferences.
          </p>
          <p>
            <strong>Format:</strong> JSON (JavaScript Object Notation)
          </p>
          <p>
            <strong>Storage:</strong> Settings are saved locally in your browser's localStorage
          </p>
          <p>
            <strong>Sharing:</strong> Export and share configuration files with your team to ensure
            consistent UI settings across environments
          </p>
        </div>
      </div>
    </div>
  );
}

