// Layout Tab - Layout preferences UI
import React from 'react';
import { useLayout } from '../../context/ConfigContext';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';

export function LayoutTab() {
  const { layout, updateLayout } = useLayout();

  const handleChatDockHeightChange = (value: number[]) => {
    updateLayout({
      defaultChatDockHeight: value[0],
    });
  };

  const handlePanelSizeChange = (panel: string, value: number[]) => {
    updateLayout({
      panelSizes: {
        ...layout.panelSizes,
        [panel]: value[0],
      },
    });
  };

  const panelSizeConfigs = [
    { key: 'calibrationSuite', label: 'Calibration Suite' },
    { key: 'virtualCalibration', label: 'Virtual Calibration' },
    { key: 'dataLogging', label: 'Data Logging' },
    { key: 'auraOrchestrator', label: 'AURA Orchestrator' },
  ];

  return (
    <div className="space-y-6">
      {/* Chat Dock Height */}
      <div>
        <Label className="mb-3 block">Chat Dock</Label>
        <div>
          <Label className="mb-2 block text-sm">
            Default Height: {layout.defaultChatDockHeight}px
          </Label>
          <Slider
            value={[layout.defaultChatDockHeight]}
            onValueChange={handleChatDockHeightChange}
            min={150}
            max={600}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>150px (Compact)</span>
            <span>600px (Tall)</span>
          </div>
        </div>
      </div>

      {/* Panel Sizes */}
      <div>
        <Label className="mb-3 block">Default Panel Sizes</Label>
        <div className="space-y-4">
          {panelSizeConfigs.map(({ key, label }) => (
            <div key={key}>
              <Label className="mb-2 block text-sm">
                {label}: {layout.panelSizes[key as keyof typeof layout.panelSizes]}%
              </Label>
              <Slider
                value={[layout.panelSizes[key as keyof typeof layout.panelSizes]]}
                onValueChange={(value) => handlePanelSizeChange(key, value)}
                min={20}
                max={80}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>20%</span>
                <span>80%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible Behavior */}
      <div>
        <Label className="mb-3 block">Behavior</Label>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm block">Auto-minimize on chat focus</Label>
              <p className="text-xs text-gray-500 mt-1">
                Minimize panels when chat input is active
              </p>
            </div>
            <Switch
              checked={layout.collapsibleBehavior.autoMinimizeOnChatFocus}
              onCheckedChange={(checked) =>
                updateLayout({
                  collapsibleBehavior: {
                    ...layout.collapsibleBehavior,
                    autoMinimizeOnChatFocus: checked,
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Layout Preview */}
      <div className="border border-gray-300 rounded-lg p-4">
        <Label className="block mb-3">Layout Preview</Label>
        <div className="space-y-2">
          <div
            className="bg-gray-200 rounded"
            style={{ height: `${layout.defaultChatDockHeight / 3}px` }}
          >
            <div className="h-full flex items-center justify-center text-xs text-gray-600">
              Chat Dock ({layout.defaultChatDockHeight}px)
            </div>
          </div>
          <div className="flex gap-2">
            {panelSizeConfigs.slice(0, 2).map(({ key, label }) => (
              <div
                key={key}
                className="bg-gray-200 rounded h-16 flex items-center justify-center text-xs text-gray-600"
                style={{
                  width: `${layout.panelSizes[key as keyof typeof layout.panelSizes]}%`,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

