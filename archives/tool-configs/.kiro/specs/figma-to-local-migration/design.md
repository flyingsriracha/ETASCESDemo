# Design Document

## Overview

The migration design transforms the Figma-exported ETAS CES Demonstrator into a fully functional local React application. The design maintains the existing component architecture while adding the necessary build infrastructure, dependency management, and configuration files to enable local development and production builds.

## Architecture

### Application Structure
```
etas-ces-demonstrator/
├── public/                    # Static assets
│   ├── index.html            # HTML template
│   └── assets/               # Images, icons
├── src/                      # Source code
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   ├── components/           # React components
│   │   ├── agents/           # Agent screen components
│   │   ├── ui/               # ShadCN UI components
│   │   └── shared/           # Shared components
│   └── styles/
│       └── globals.css       # Global styles and design tokens
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Setup instructions
```

### Build System Architecture
- **Vite**: Primary build tool for fast development and optimized production builds
- **TypeScript**: Type checking and compilation
- **Tailwind CSS**: Utility-first CSS framework with custom ETAS design tokens
- **PostCSS**: CSS processing for Tailwind and custom properties

## Components and Interfaces

### Core Application Components

#### App Component
- **Purpose**: Main router and state management
- **State**: Current screen tracking
- **Interface**: Navigation handler for screen switching
- **Dependencies**: All screen components

#### Screen Components
- **WelcomeAgent**: Landing page with navigation options
- **CalibrationAgent**: Calibration and data analytics interface
- **SWDevAgent**: Software development agent interface
- **Various Orchestrators**: Specialized workflow interfaces

#### Shared Components
- **ETASHeader**: Fixed header with branding and navigation
- **ChatDock**: Resizable chat interface
- **CollapsiblePanel**: Animated panel component
- **ETASButton**: Custom button with ETAS styling
- **SectionContainer**: Layout wrapper component

### External Dependencies

#### Core Framework
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0"
}
```

#### Build Tools
```json
{
  "vite": "^5.0.0",
  "typescript": "^5.0.0",
  "@vitejs/plugin-react": "^4.0.0"
}
```

#### Styling
```json
{
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0"
}
```

#### UI Libraries
```json
{
  "lucide-react": "^0.400.0",
  "framer-motion": "^10.16.0",
  "re-resizable": "^6.9.0"
}
```

## Data Models

### Navigation State
```typescript
type Screen = 
  | 'welcome' 
  | 'calibration' 
  | 'swdev' 
  | 'calibration-suite' 
  | 'virtual-calibration' 
  | 'data-logging' 
  | 'aura-orchestrator' 
  | 'rta-car-cloud'
  | 'component-library'
  | 'external-landing'
  | 'rta-car-placeholder';

interface AppState {
  currentScreen: Screen;
}
```

### Component Props
```typescript
interface NavigationProps {
  onNavigate: (screen: string) => void;
}

interface ETASHeaderProps {
  title?: string;
  onNavigate?: (screen: string) => void;
}
```

## Error Handling

### Build Errors
- **TypeScript Errors**: Strict type checking with helpful error messages
- **Import Resolution**: Clear error messages for missing dependencies
- **Asset Loading**: Fallback handling for missing images or fonts

### Runtime Errors
- **Component Errors**: Error boundaries to prevent app crashes
- **Navigation Errors**: Fallback to welcome screen for invalid routes
- **Asset Loading**: Graceful degradation for missing assets

### Development Errors
- **Hot Reload**: Preserve state during development updates
- **Console Warnings**: Clear warnings for development issues
- **Linting**: ESLint configuration for code quality

## Testing Strategy

### Development Testing
- **Manual Testing**: Verify all screens render correctly
- **Navigation Testing**: Test all navigation paths
- **Responsive Testing**: Verify custom breakpoints work
- **Browser Testing**: Test in Chrome, Firefox, Safari

### Build Testing
- **Development Build**: `npm run dev` starts without errors
- **Production Build**: `npm run build` completes successfully
- **Asset Optimization**: Verify images and fonts load correctly
- **Bundle Analysis**: Check for reasonable bundle sizes

### Component Testing
- **Rendering**: All components render without console errors
- **Interactions**: Buttons and navigation work as expected
- **Styling**: ETAS design system applies correctly
- **Animations**: Smooth transitions and hover effects

## Configuration Details

### Vite Configuration
```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

### Tailwind Configuration
- Custom breakpoints: sm: 640px, md: 1024px, lg: 1440px
- ETAS color palette with CSS variables
- Custom font families: Manrope, Fira Mono
- Design tokens for spacing, typography, and components

### TypeScript Configuration
- Strict mode enabled
- Path mapping for clean imports
- React JSX support
- Modern ES target

## Asset Management

### Images and Icons
- **Logo Assets**: ETAS and Azure logos from CDN
- **Figma Assets**: Handle figma:asset imports
- **Icon Library**: Lucide React for consistent icons
- **Optimization**: Vite handles image optimization

### Fonts
- **Google Fonts**: Manrope (400, 600, 800) and Fira Mono (400)
- **Loading Strategy**: Preload critical fonts
- **Fallbacks**: System font fallbacks for reliability

### Static Assets
- **Public Directory**: Static assets served directly
- **Asset Imports**: Dynamic imports for bundled assets
- **CDN Assets**: External assets with fallback handling