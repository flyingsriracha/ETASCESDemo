# ETAS CES Demonstrator - Configuration System Guide

## Overview

The ETAS CES Demonstrator now includes a comprehensive configuration system that allows both developers and end users to fully customize the application's appearance, behavior, and functionality.

## Features

### ✅ What's Configurable

#### Theme Configuration
- **Colors**: All brand and semantic colors (primary, secondary, success, error, warning, etc.)
- **Typography**: Font family, base font size, font weights, line heights
- **Spacing**: Complete spacing grid customization
- **Border Radius**: Rounded corner settings
- **Dark Mode**: Light, Dark, or System preference

#### Application Settings
- **API Endpoints**: Stream and sync URLs for chat functionality
- **Model Configuration**: AI model name and settings
- **Feature Flags**: Enable/disable specific agents and features
- **Default Screen**: Choose landing page
- **Animation Speed**: Adjust animation playback speed (0.5x - 2.0x)

#### Layout Preferences
- **Chat Dock Height**: Adjustable default height (150-600px)
- **Panel Sizes**: Default split ratios for orchestrator views
- **Auto-minimize Behavior**: Configure panel collapse on chat focus

### 🎨 Accessing Settings

1. **Click the Settings Icon** in the top-right header
2. **Keyboard Shortcut**: Press `Cmd/Ctrl + ,` (coming soon)
3. **Four Tabs Available**:
   - **Theme**: Colors, typography, dark mode
   - **Application**: API, models, features
   - **Layout**: Sizes, behaviors
   - **Import/Export**: Save/load configurations

## Configuration Architecture

### File Structure

```
src/
├── types/
│   └── config.ts              # TypeScript interfaces and DEFAULT_CONFIG
├── lib/
│   ├── config-manager.ts      # localStorage persistence & JSON I/O
│   └── theme-manager.ts       # Dynamic CSS variable injection
├── context/
│   └── ConfigContext.tsx      # React Context with hooks
└── components/
    ├── settings-panel.tsx     # Main settings modal
    └── settings/
        ├── theme-tab.tsx      # Theme configuration UI
        ├── app-tab.tsx        # App settings UI
        ├── layout-tab.tsx     # Layout preferences UI
        └── import-export-tab.tsx  # Config I/O UI
```

### Configuration Flow

```
┌─────────────────┐
│   User Action   │
│  (Settings UI)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ConfigContext  │ ◄─── useConfig(), useTheme(), etc.
│   (React State) │
└────────┬────────┘
         │
         ├──► Theme Manager ──► CSS Variables (--primary, etc.)
         │
         └──► Config Manager ──► localStorage + JSON export
```

## Usage

### For End Users

#### Changing Theme Colors

1. Open Settings → Theme tab
2. Click color picker or enter hex value
3. Changes apply immediately
4. Settings auto-save to localStorage

#### Switching to Dark Mode

1. Open Settings → Theme tab
2. Choose: Light / Dark / System
3. Dark mode applies instantly

#### Exporting Configuration

1. Open Settings → Import/Export tab
2. Click "Export Configuration"
3. Downloads `ui-config.json` file
4. Share with team or save as backup

#### Importing Configuration

1. Open Settings → Import/Export tab
2. Click "Import Configuration"
3. Select previously exported `.json` file
4. Page reloads with new settings

#### Resetting to Defaults

1. Open Settings → Import/Export tab
2. Click "Reset to Defaults"
3. Confirm the action
4. All settings revert to ETAS defaults

### For Developers

#### Using Configuration in Components

```typescript
import { useConfig, useTheme, useAppSettings, useLayout } from '../context/ConfigContext';

function MyComponent() {
  // Get full config
  const { config } = useConfig();
  
  // Or get specific sections
  const { theme, updateTheme } = useTheme();
  const { application, updateApplication } = useAppSettings();
  const { layout, updateLayout } = useLayout();
  
  // Update theme colors
  const changeColor = () => {
    updateTheme({
      colors: {
        ...theme.colors,
        primary: '#FF0000'
      }
    });
  };
  
  return <div>...</div>;
}
```

#### Programmatically Updating Config

```typescript
import { updateConfig, saveConfig } from '../lib/config-manager';

// Update and save
const newConfig = updateConfig({
  theme: {
    colors: {
      primary: '#164293'
    }
  }
});

// Manual save
saveConfig(newConfig);
```

#### Loading Developer Defaults

Place a `ui-config.json` file in the `public/` directory:

```json
{
  "version": "1.0",
  "config": {
    "theme": {
      "colors": {
        "primary": "#164293",
        "secondary": "#89037A"
      }
    }
  }
}
```

This file can be loaded programmatically or distributed with the application.

## Configuration Schema

### Complete UIConfig Interface

```typescript
interface UIConfig {
  theme: {
    darkMode: 'light' | 'dark' | 'system';
    colors: {
      primary: string;
      secondary: string;
      background: string;
      foreground: string;
      // ... 20+ color properties
    };
    typography: {
      fontFamily: string;
      baseFontSize: number;
      fontWeights: {
        normal: number;
        medium: number;
        bold: number;
      };
      lineHeights: { /* ... */ };
    };
    spacing: { /* 1-16 spacing values */ };
    borderRadius: { /* sm, md, lg, xl */ };
  };
  application: {
    apiEndpoints: {
      streamUrl: string;
      syncUrl: string;
    };
    modelName: string;
    featureFlags: {
      enableCalibrationAgent: boolean;
      enableSWDevAgent: boolean;
      // ... more flags
    };
    defaultScreen: string;
    animationSpeed: number;
  };
  layout: {
    defaultChatDockHeight: number;
    panelSizes: {
      calibrationSuite: number;
      virtualCalibration: number;
      dataLogging: number;
      auraOrchestrator: number;
    };
    collapsibleBehavior: {
      autoMinimizeOnChatFocus: boolean;
    };
  };
}
```

## Persistence

### localStorage

All settings are automatically saved to browser localStorage:

- **Key**: `etas-ui-config`
- **Auto-save**: Debounced 500ms after changes
- **Persistence**: Survives page refreshes
- **Scope**: Per-browser, per-origin

### JSON Export/Import

- **Format**: JSON with version metadata
- **Compatible**: Can be shared across machines
- **Validation**: Imported configs are validated and merged with defaults

## Theming System

### How It Works

1. **ConfigContext** loads config from localStorage
2. **Theme Manager** applies config as CSS variables to `:root`
3. **Components** use Tailwind semantic classes (`bg-primary`, `text-foreground`)
4. **Runtime Updates** modify CSS variables without page reload

### CSS Variables

The theme system exposes 40+ CSS variables:

```css
:root {
  --primary: #164293;
  --secondary: #89037A;
  --background: #FAFAFA;
  --foreground: #5A646E;
  /* ... and many more */
}
```

### Dark Mode

Dark mode is implemented via:
1. Adding `.dark` class to `<html>`
2. CSS variables defined in `:root.dark { ... }`
3. Tailwind's dark mode support
4. System preference detection via `prefers-color-scheme`

## Best Practices

### For Users

1. **Export before major changes**: Save your current config before experimenting
2. **Use System mode**: Let dark mode follow your OS preference
3. **Incremental adjustments**: Make small changes and see the effect
4. **Share configs**: Export and share successful configurations with your team

### For Developers

1. **Use semantic classes**: Prefer `bg-primary` over hardcoded hex values
2. **Don't hardcode**: Use config values via hooks
3. **Validate imports**: Always validate user-provided config files
4. **Test dark mode**: Ensure your components work in both light and dark modes
5. **Document changes**: If adding new config options, update this guide

## Troubleshooting

### Settings not persisting

- Check browser localStorage is enabled
- Try exporting/importing to force a save
- Check browser console for errors

### Colors not updating

- Hard refresh the page (Cmd/Ctrl + Shift + R)
- Check if component uses semantic classes
- Verify CSS variables are applied in DevTools

### Import fails

- Ensure JSON file has correct structure
- Check file version matches (currently "1.0")
- Verify all required fields are present

### Dark mode not working

- Check HTML element has `.dark` class
- Verify dark mode CSS variables exist
- Ensure components use Tailwind's dark: modifier

## Debugging

### Check Current Config

```javascript
// In browser console
const config = JSON.parse(localStorage.getItem('etas-ui-config'));
console.log(config);
```

### Inspect CSS Variables

```javascript
// In browser console
const root = document.documentElement;
console.log(getComputedStyle(root).getPropertyValue('--primary'));
```

### Reset Everything

```javascript
// In browser console
localStorage.removeItem('etas-ui-config');
location.reload();
```

## Migration Notes

### From Hardcoded Colors

The configuration system replaces direct color usage:

**Before:**
```tsx
<div className="bg-[#164293] text-white">
```

**After:**
```tsx
<div className="bg-primary text-primary-foreground">
```

This allows runtime customization via the settings panel.

## Future Enhancements

Planned features for future releases:

- [ ] Preset themes (High Contrast, Compact, etc.)
- [ ] Keyboard shortcut configuration
- [ ] Multi-language support
- [ ] Cloud sync for settings
- [ ] Team configuration sharing
- [ ] A/B testing different configs
- [ ] Accessibility presets (WCAG AAA)

## Support

For issues or questions about the configuration system:

1. Check this documentation
2. Review the code in `src/context/ConfigContext.tsx`
3. Inspect browser console for errors
4. Export config and share for debugging

---

**Version**: 1.0  
**Last Updated**: November 2024  
**Status**: ✅ Production Ready

