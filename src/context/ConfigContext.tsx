// Configuration Context
// Global state management for UI configuration with React Context

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UIConfig,
  ThemeConfig,
  AppConfig,
  LayoutConfig,
  DEFAULT_CONFIG,
} from '../types/config';
import {
  loadConfig,
  saveConfig,
  updateConfig,
  debouncedSaveConfig,
  resetConfig,
  exportConfig,
  importConfig,
} from '../lib/config-manager';
import { applyTheme, watchSystemTheme, getSystemThemePreference } from '../lib/theme-manager';

interface ConfigContextType {
  config: UIConfig;
  theme: ThemeConfig;
  application: AppConfig;
  layout: LayoutConfig;
  
  // Update functions
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  updateApplication: (app: Partial<AppConfig>) => void;
  updateLayout: (layout: Partial<LayoutConfig>) => void;
  updateFullConfig: (config: Partial<UIConfig>) => void;
  
  // Utility functions
  resetToDefaults: () => void;
  exportConfiguration: () => void;
  importConfiguration: (file: File) => Promise<void>;
  
  // Loading state
  isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<UIConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  // Load config on mount
  useEffect(() => {
    try {
      const loaded = loadConfig();
      setConfig(loaded);
      applyTheme(loaded.theme);
    } catch (error) {
      console.error('Failed to load config:', error);
      setConfig(DEFAULT_CONFIG);
      applyTheme(DEFAULT_CONFIG.theme);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Watch for system theme changes
  useEffect(() => {
    if (config.theme.darkMode === 'system') {
      const cleanup = watchSystemTheme((isDark) => {
        applyTheme({
          ...config.theme,
          darkMode: isDark ? 'dark' : 'light',
        });
      });
      return cleanup;
    }
  }, [config.theme]);

  // Update theme
  const updateTheme = useCallback((themeUpdate: Partial<ThemeConfig>) => {
    setConfig((prev) => {
      const newTheme = { ...prev.theme, ...themeUpdate };
      const newConfig = { ...prev, theme: newTheme };
      
      // Apply theme immediately
      applyTheme(newTheme);
      
      // Save to localStorage with debounce
      debouncedSaveConfig(newConfig);
      
      return newConfig;
    });
  }, []);

  // Update application settings
  const updateApplication = useCallback((appUpdate: Partial<AppConfig>) => {
    setConfig((prev) => {
      const newApp = { ...prev.application, ...appUpdate };
      const newConfig = { ...prev, application: newApp };
      
      // Save to localStorage with debounce
      debouncedSaveConfig(newConfig);
      
      return newConfig;
    });
  }, []);

  // Update layout settings
  const updateLayout = useCallback((layoutUpdate: Partial<LayoutConfig>) => {
    setConfig((prev) => {
      const newLayout = { ...prev.layout, ...layoutUpdate };
      const newConfig = { ...prev, layout: newLayout };
      
      // Save to localStorage with debounce
      debouncedSaveConfig(newConfig);
      
      return newConfig;
    });
  }, []);

  // Update full config
  const updateFullConfig = useCallback((configUpdate: Partial<UIConfig>) => {
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        ...configUpdate,
        theme: { ...prev.theme, ...configUpdate.theme },
        application: { ...prev.application, ...configUpdate.application },
        layout: { ...prev.layout, ...configUpdate.layout },
      };
      
      // Apply theme if it changed
      if (configUpdate.theme) {
        applyTheme(newConfig.theme);
      }
      
      // Save to localStorage with debounce
      debouncedSaveConfig(newConfig);
      
      return newConfig;
    });
  }, []);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    const defaults = resetConfig();
    setConfig(defaults);
    applyTheme(defaults.theme);
  }, []);

  // Export configuration
  const exportConfiguration = useCallback(() => {
    try {
      exportConfig(config);
    } catch (error) {
      console.error('Failed to export config:', error);
      alert('Failed to export configuration');
    }
  }, [config]);

  // Import configuration
  const importConfiguration = useCallback(async (file: File) => {
    try {
      const imported = await importConfig(file);
      setConfig(imported);
      applyTheme(imported.theme);
      saveConfig(imported);
    } catch (error) {
      console.error('Failed to import config:', error);
      throw error;
    }
  }, []);

  const value: ConfigContextType = {
    config,
    theme: config.theme,
    application: config.application,
    layout: config.layout,
    updateTheme,
    updateApplication,
    updateLayout,
    updateFullConfig,
    resetToDefaults,
    exportConfiguration,
    importConfiguration,
    isLoading,
  };

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

// Custom hooks for accessing config
export function useConfig(): ConfigContextType {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
}

export function useTheme(): {
  theme: ThemeConfig;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  toggleDarkMode: () => void;
} {
  const { theme, updateTheme } = useConfig();
  
  const toggleDarkMode = useCallback(() => {
    const newMode = theme.darkMode === 'dark' ? 'light' : 'dark';
    updateTheme({ darkMode: newMode });
  }, [theme.darkMode, updateTheme]);
  
  return { theme, updateTheme, toggleDarkMode };
}

export function useAppSettings(): {
  application: AppConfig;
  updateApplication: (app: Partial<AppConfig>) => void;
} {
  const { application, updateApplication } = useConfig();
  return { application, updateApplication };
}

export function useLayout(): {
  layout: LayoutConfig;
  updateLayout: (layout: Partial<LayoutConfig>) => void;
} {
  const { layout, updateLayout } = useConfig();
  return { layout, updateLayout };
}

