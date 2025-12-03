// UI Configuration Type Definitions
// Comprehensive configuration system for theme, application, and layout settings

export interface UIConfig {
  theme: ThemeConfig;
  application: AppConfig;
  layout: LayoutConfig;
}

export interface ThemeConfig {
  darkMode: 'light' | 'dark' | 'system';
  colors: ColorConfig;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  borderRadius: BorderRadiusConfig;
}

export interface ColorConfig {
  // Brand colors
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  
  // Surface colors
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  
  // Component colors
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  
  // Semantic colors
  success: string;
  error: string;
  warning: string;
  destructive: string;
  destructiveForeground: string;
  
  // UI elements
  border: string;
  input: string;
  inputBackground: string;
  ring: string;
  
  // ETAS specific
  etasBlue: string;
  etasPurple: string;
  surface50: string;
  gray900: string;
}

export interface TypographyConfig {
  fontFamily: string;
  monoFontFamily: string;
  baseFontSize: number; // in pixels
  fontWeights: {
    normal: number;
    medium: number;
    bold: number;
  };
  letterSpacing: string;
  lineHeights: {
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
}

export interface SpacingConfig {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '8': string;
  '10': string;
  '12': string;
  '16': string;
}

export interface BorderRadiusConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface AppConfig {
  apiEndpoints: {
    streamUrl: string;
    syncUrl: string;
  };
  modelName: string;
  featureFlags: {
    enableCalibrationAgent: boolean;
    enableSWDevAgent: boolean;
    enableAURAOrchestrator: boolean;
    enableDataLogging: boolean;
    enableVirtualCalibration: boolean;
    enableRTACarCloud: boolean;
    enableComponentLibrary: boolean;
  };
  defaultScreen: string;
  animationSpeed: number; // multiplier, 1.0 = normal
}

export interface LayoutConfig {
  defaultChatDockHeight: number; // in pixels
  panelSizes: {
    calibrationSuite: number; // default panel size percentage
    virtualCalibration: number;
    dataLogging: number;
    auraOrchestrator: number;
  };
  collapsibleBehavior: {
    autoMinimizeOnChatFocus: boolean;
  };
}

// Default configuration matching ETAS design system
export const DEFAULT_CONFIG: UIConfig = {
  theme: {
    darkMode: 'light',
    colors: {
      primary: '#164293',
      primaryForeground: '#ffffff',
      secondary: '#89037A',
      secondaryForeground: '#ffffff',
      background: '#FAFAFA',
      foreground: '#5A646E',
      card: '#ffffff',
      cardForeground: '#5A646E',
      popover: '#ffffff',
      popoverForeground: '#5A646E',
      muted: '#FAFAFA',
      mutedForeground: '#5A646E',
      accent: '#164293',
      accentForeground: '#ffffff',
      success: '#039C7D',
      error: '#E5004A',
      warning: '#FCCD22',
      destructive: '#E5004A',
      destructiveForeground: '#ffffff',
      border: 'rgba(90, 100, 110, 0.15)',
      input: 'transparent',
      inputBackground: '#ffffff',
      ring: '#164293',
      etasBlue: '#164293',
      etasPurple: '#89037A',
      surface50: '#FAFAFA',
      gray900: '#5A646E',
    },
    typography: {
      fontFamily: 'Manrope, sans-serif',
      monoFontFamily: 'Fira Mono, monospace',
      baseFontSize: 14,
      fontWeights: {
        normal: 400,
        medium: 600,
        bold: 800,
      },
      letterSpacing: '-0.01em',
      lineHeights: {
        xs: '16px',
        s: '18px',
        m: '20px',
        l: '22px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '36px',
        '4xl': '44px',
        '5xl': '56px',
      },
    },
    spacing: {
      '1': '4px',
      '2': '8px',
      '3': '10px',
      '4': '12px',
      '5': '16px',
      '6': '20px',
      '8': '26px',
      '10': '32px',
      '12': '38px',
      '16': '51px',
    },
    borderRadius: {
      sm: 'calc(8px - 4px)',
      md: 'calc(8px - 2px)',
      lg: '8px',
      xl: 'calc(8px + 4px)',
    },
  },
  application: {
    apiEndpoints: {
      streamUrl: '/api/chat',
      syncUrl: '/api/chat-sync',
    },
    modelName: 'Phi-4-mini-reasoning',
    featureFlags: {
      enableCalibrationAgent: true,
      enableSWDevAgent: true,
      enableAURAOrchestrator: true,
      enableDataLogging: true,
      enableVirtualCalibration: true,
      enableRTACarCloud: true,
      enableComponentLibrary: true,
    },
    defaultScreen: 'welcome',
    animationSpeed: 1.0,
  },
  layout: {
    defaultChatDockHeight: 200,
    panelSizes: {
      calibrationSuite: 50,
      virtualCalibration: 50,
      dataLogging: 50,
      auraOrchestrator: 50,
    },
    collapsibleBehavior: {
      autoMinimizeOnChatFocus: true,
    },
  },
};

// Type guard for validating UIConfig
export function isValidUIConfig(config: any): config is UIConfig {
  return (
    config &&
    typeof config === 'object' &&
    'theme' in config &&
    'application' in config &&
    'layout' in config
  );
}

