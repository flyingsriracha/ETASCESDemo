// App Tab - Application settings UI
import React from 'react';
import { useAppSettings } from '../../context/ConfigContext';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';

export function AppTab() {
  const { application, updateApplication } = useAppSettings();

  const handleEndpointChange = (key: 'streamUrl' | 'syncUrl', value: string) => {
    updateApplication({
      apiEndpoints: {
        ...application.apiEndpoints,
        [key]: value,
      },
    });
  };

  const handleFeatureFlagChange = (flag: string, enabled: boolean) => {
    updateApplication({
      featureFlags: {
        ...application.featureFlags,
        [flag]: enabled,
      },
    });
  };

  const handleAnimationSpeedChange = (value: number[]) => {
    updateApplication({
      animationSpeed: value[0],
    });
  };

  const featureFlags = [
    { key: 'enableCalibrationAgent', label: 'Calibration Agent' },
    { key: 'enableSWDevAgent', label: 'SW Development Agent' },
    { key: 'enableAURAOrchestrator', label: 'AURA Orchestrator' },
    { key: 'enableDataLogging', label: 'Data Logging' },
    { key: 'enableVirtualCalibration', label: 'Virtual Calibration' },
    { key: 'enableRTACarCloud', label: 'RTA-CAR Cloud' },
    { key: 'enableComponentLibrary', label: 'Component Library' },
  ];

  return (
    <div className="space-y-6">
      {/* API Endpoints */}
      <div>
        <Label className="mb-3 block">API Endpoints</Label>
        <div className="space-y-3">
          <div>
            <Label className="mb-1.5 block text-sm">Stream URL</Label>
            <Input
              type="text"
              value={application.apiEndpoints.streamUrl}
              onChange={(e) => handleEndpointChange('streamUrl', e.target.value)}
              placeholder="/api/chat"
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm">Sync URL</Label>
            <Input
              type="text"
              value={application.apiEndpoints.syncUrl}
              onChange={(e) => handleEndpointChange('syncUrl', e.target.value)}
              placeholder="/api/chat-sync"
            />
          </div>
        </div>
      </div>

      {/* Model Configuration */}
      <div>
        <Label className="mb-3 block">Model Configuration</Label>
        <div>
          <Label className="mb-1.5 block text-sm">Model Name</Label>
          <Input
            type="text"
            value={application.modelName}
            onChange={(e) => updateApplication({ modelName: e.target.value })}
            placeholder="Phi-4-mini-reasoning"
          />
        </div>
      </div>

      {/* Default Screen */}
      <div>
        <Label className="mb-3 block">Default Screen</Label>
        <div>
          <Label className="mb-1.5 block text-sm">Landing Page</Label>
          <select
            value={application.defaultScreen}
            onChange={(e) => updateApplication({ defaultScreen: e.target.value })}
            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164293]"
          >
            <option value="welcome">Welcome</option>
            <option value="calibration">Calibration Agent</option>
            <option value="swdev">SW Development Agent</option>
            <option value="component-library">Component Library</option>
          </select>
        </div>
      </div>

      {/* Animation Speed */}
      <div>
        <Label className="mb-3 block">Animation Speed</Label>
        <div>
          <Label className="mb-2 block text-sm">
            Speed Multiplier: {application.animationSpeed.toFixed(1)}x
          </Label>
          <Slider
            value={[application.animationSpeed]}
            onValueChange={handleAnimationSpeedChange}
            min={0.5}
            max={2.0}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.5x (Slower)</span>
            <span>2.0x (Faster)</span>
          </div>
        </div>
      </div>

      {/* Feature Flags */}
      <div>
        <Label className="mb-3 block">Feature Flags</Label>
        <div className="space-y-3">
          {featureFlags.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <Label className="text-sm">{label}</Label>
              <Switch
                checked={application.featureFlags[key as keyof typeof application.featureFlags]}
                onCheckedChange={(checked) => handleFeatureFlagChange(key, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

