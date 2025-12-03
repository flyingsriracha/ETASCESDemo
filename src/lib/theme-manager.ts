// Theme Manager
// Dynamically applies theme configuration to CSS variables at runtime

import { ThemeConfig } from '../types/config';

/**
 * Apply theme configuration to CSS variables
 */
export function applyTheme(theme: ThemeConfig): void {
  const root = document.documentElement;
  
  // Apply dark mode class
  if (theme.darkMode === 'dark') {
    root.classList.add('dark');
  } else if (theme.darkMode === 'light') {
    root.classList.remove('dark');
  } else {
    // System preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
  
  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = camelToKebab(key);
    root.style.setProperty(`--${cssVar}`, value);
  });
  
  // Apply typography variables
  root.style.setProperty('--font-size', `${theme.typography.baseFontSize}px`);
  root.style.setProperty('--letter-spacing', theme.typography.letterSpacing);
  root.style.setProperty('--font-weight-normal', theme.typography.fontWeights.normal.toString());
  root.style.setProperty('--font-weight-medium', theme.typography.fontWeights.medium.toString());
  root.style.setProperty('--font-weight-bold', theme.typography.fontWeights.bold.toString());
  
  // Apply line heights
  Object.entries(theme.typography.lineHeights).forEach(([key, value]) => {
    root.style.setProperty(`--line-height-${key}`, value);
  });
  
  // Apply font families
  document.body.style.fontFamily = theme.typography.fontFamily;
  
  // Apply spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });
  
  // Apply border radius
  const baseRadius = theme.borderRadius.lg;
  root.style.setProperty('--radius', baseRadius);
}

/**
 * Convert camelCase to kebab-case for CSS variables
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Listen for system theme changes
 */
export function watchSystemTheme(callback: (isDark: boolean) => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  mediaQuery.addEventListener('change', handler);
  
  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handler);
  };
}

/**
 * Get current system theme preference
 */
export function getSystemThemePreference(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Generate CSS variable string from theme config
 * Useful for inline styles
 */
export function getCSSVariable(varName: string): string {
  return `var(--${camelToKebab(varName)})`;
}

/**
 * Read current value of a CSS variable
 */
export function readCSSVariable(varName: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${camelToKebab(varName)}`)
    .trim();
}

/**
 * Preset themes
 */
export const THEME_PRESETS = {
  etas: {
    name: 'ETAS Default',
    description: 'Official ETAS brand colors and compact UI',
  },
  highContrast: {
    name: 'High Contrast',
    description: 'Enhanced visibility for better accessibility',
    colors: {
      primary: '#0052CC',
      secondary: '#6B007B',
      background: '#FFFFFF',
      foreground: '#000000',
    },
  },
  dark: {
    name: 'Dark Mode',
    description: 'Dark theme for low-light environments',
  },
};

