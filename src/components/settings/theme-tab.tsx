// Theme Tab - Theme configuration UI
import React from 'react';
import { useTheme } from '../../context/ConfigContext';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';

export function ThemeTab() {
  const { theme, updateTheme } = useTheme();

  const handleColorChange = (key: string, value: string) => {
    updateTheme({
      colors: {
        ...theme.colors,
        [key]: value,
      },
    });
  };

  const handleFontSizeChange = (value: number[]) => {
    updateTheme({
      typography: {
        ...theme.typography,
        baseFontSize: value[0],
      },
    });
  };

  const handleDarkModeChange = (mode: 'light' | 'dark' | 'system') => {
    updateTheme({ darkMode: mode });
  };

  const colorFields: Array<{ key: keyof typeof theme.colors; label: string }> = [
    { key: 'primary', label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'background', label: 'Background' },
    { key: 'foreground', label: 'Foreground' },
    { key: 'success', label: 'Success' },
    { key: 'error', label: 'Error' },
    { key: 'warning', label: 'Warning' },
  ];

  return (
    <div className="space-y-6">
      {/* Dark Mode Toggle */}
      <div>
        <Label className="mb-3 block">Dark Mode</Label>
        <div className="flex gap-2">
          {['light', 'dark', 'system'].map((mode) => (
            <button
              key={mode}
              onClick={() => handleDarkModeChange(mode as any)}
              className={`px-4 py-2 rounded-lg border-2 capitalize transition-colors ${
                theme.darkMode === mode
                  ? 'border-[#164293] bg-[#164293] text-white'
                  : 'border-gray-300 hover:border-[#164293]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <Label className="mb-3 block">Colors</Label>
        <div className="grid grid-cols-2 gap-4">
          {colorFields.map(({ key, label }) => (
            <div key={key}>
              <Label className="mb-1.5 block text-sm">{label}</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={theme.colors[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="h-10 w-16 cursor-pointer"
                />
                <Input
                  type="text"
                  value={theme.colors[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="flex-1"
                  placeholder="#164293"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <Label className="mb-3 block">Typography</Label>
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block text-sm">
              Base Font Size: {theme.typography.baseFontSize}px
            </Label>
            <Slider
              value={[theme.typography.baseFontSize]}
              onValueChange={handleFontSizeChange}
              min={12}
              max={18}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>12px</span>
              <span>18px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="border border-gray-300 rounded-lg p-4 space-y-2">
        <Label className="block mb-2">Preview</Label>
        <h1 className="text-2xl font-semibold" style={{ color: theme.colors.primary }}>
          Heading Text
        </h1>
        <p className="text-base" style={{ color: theme.colors.foreground }}>
          This is body text using the current theme settings. The base font size is{' '}
          {theme.typography.baseFontSize}px.
        </p>
        <div className="flex gap-2 mt-3">
          <button
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: theme.colors.primary }}
          >
            Primary Button
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: theme.colors.secondary }}
          >
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );
}

