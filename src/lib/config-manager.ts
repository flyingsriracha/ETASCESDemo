// Configuration Manager
// Handles persistence, loading, saving, and validation of UI configuration

import { UIConfig, DEFAULT_CONFIG, isValidUIConfig } from '../types/config';

const STORAGE_KEY = 'etas-ui-config';
const CONFIG_VERSION = '1.0';

interface StoredConfig {
  version: string;
  config: UIConfig;
  timestamp: number;
}

/**
 * Deep merge two objects, with source taking precedence
 */
function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] !== undefined && source[key] !== null) {
      if (
        typeof source[key] === 'object' &&
        !Array.isArray(source[key]) &&
        typeof target[key] === 'object' &&
        !Array.isArray(target[key])
      ) {
        (result as any)[key] = deepMerge(target[key], source[key] as any);
      } else {
        (result as any)[key] = source[key];
      }
    }
  }
  
  return result;
}

/**
 * Load configuration from localStorage
 */
export function loadConfig(): UIConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULT_CONFIG;
    }

    const parsed: StoredConfig = JSON.parse(stored);
    
    // Validate version compatibility
    if (parsed.version !== CONFIG_VERSION) {
      console.warn('Config version mismatch, using defaults');
      return DEFAULT_CONFIG;
    }

    // Validate config structure
    if (!isValidUIConfig(parsed.config)) {
      console.error('Invalid config structure, using defaults');
      return DEFAULT_CONFIG;
    }

    // Merge with defaults to ensure all fields exist
    return deepMerge(DEFAULT_CONFIG, parsed.config);
  } catch (error) {
    console.error('Error loading config:', error);
    return DEFAULT_CONFIG;
  }
}

/**
 * Save configuration to localStorage
 */
export function saveConfig(config: UIConfig): boolean {
  try {
    const stored: StoredConfig = {
      version: CONFIG_VERSION,
      config,
      timestamp: Date.now(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving config:', error);
    return false;
  }
}

/**
 * Export configuration as JSON file
 */
export function exportConfig(config: UIConfig, filename = 'ui-config.json'): void {
  try {
    const exported: StoredConfig = {
      version: CONFIG_VERSION,
      config,
      timestamp: Date.now(),
    };

    const blob = new Blob([JSON.stringify(exported, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error('Error exporting config:', error);
    throw new Error('Failed to export configuration');
  }
}

/**
 * Import configuration from JSON file
 */
export function importConfig(file: File): Promise<UIConfig> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed: StoredConfig = JSON.parse(content);
        
        // Validate structure
        if (!isValidUIConfig(parsed.config)) {
          reject(new Error('Invalid configuration file structure'));
          return;
        }
        
        // Merge with defaults for safety
        const merged = deepMerge(DEFAULT_CONFIG, parsed.config);
        resolve(merged);
      } catch (error) {
        reject(new Error('Failed to parse configuration file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read configuration file'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Reset configuration to defaults
 */
export function resetConfig(): UIConfig {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_CONFIG;
  } catch (error) {
    console.error('Error resetting config:', error);
    return DEFAULT_CONFIG;
  }
}

/**
 * Update a partial configuration (deep merge)
 */
export function updateConfig(updates: Partial<UIConfig>): UIConfig {
  const current = loadConfig();
  const updated = deepMerge(current, updates);
  saveConfig(updated);
  return updated;
}

/**
 * Get a specific config section
 */
export function getThemeConfig() {
  return loadConfig().theme;
}

export function getAppConfig() {
  return loadConfig().application;
}

export function getLayoutConfig() {
  return loadConfig().layout;
}

/**
 * Debounced save function for auto-save functionality
 */
let saveTimeout: NodeJS.Timeout | null = null;

export function debouncedSaveConfig(config: UIConfig, delay = 500): void {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  
  saveTimeout = setTimeout(() => {
    saveConfig(config);
    saveTimeout = null;
  }, delay);
}

