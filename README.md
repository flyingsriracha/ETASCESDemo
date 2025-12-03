# ETAS CES Demonstrator

**Design System:** ETAS CI 2.0  
**Framework:** React 18 + TypeScript + Tailwind CSS + Vite  
**Status:** ✅ Production Ready  
**Platforms:** MacBook Pro (ARM64) + Nvidia Jetson (ARM64) Compatible

A comprehensive automotive AI and cloudification demonstration application showcasing ETAS technologies integrated with Azure cloud services.

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Design System Guide](#-design-system-guide-for-designers)
- [Development Guide](#-development-guide)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

### For First-Time Users

#### Step 1: Prerequisites

Ensure you have the following installed:
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Git** (for version control)

Verify installation:
```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 8.0.0
```

#### Step 2: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd CESDemoSite

# Install all dependencies
npm install
```

This will install all required packages including React, TypeScript, Tailwind CSS, and UI components.

#### Step 3: Start Development Server

**Option A: Using Platform-Specific Scripts (Easiest)**

**macOS:**
- Double-click `run-website.command` in Finder, or run:
```bash
./run-website.command
```

**Windows:**
- Double-click `run-website-windows.bat` in File Explorer, or run:
```cmd
run-website-windows.bat
```

**Linux:**
- Run from terminal:
```bash
./run-website.sh
```

These scripts will automatically:
- Install dependencies if needed
- Start the development server
- Open in your default browser (macOS/Windows)

**Option B: Using npm Command (All Platforms)**

```bash
# Start the development server with hot reload
npm run dev
```

The application will automatically:
- Start on **http://localhost:1580**
- Open in your default browser (macOS/Windows)
- Enable hot module replacement (changes appear instantly)

#### Step 4: Access the Application

Once the server starts, you'll see:
- **Welcome Screen** - Main navigation hub
- **Calibration Agent** - Data analytics workflows
- **SW Development Agent** - Software development tools
- **Settings Panel** - Click the gear icon (⚙️) in the header to customize the UI

---

## 🏗️ Project Structure

```
CESDemoSite/
├── src/                          # Source code directory
│   ├── App.tsx                   # Main application router & screen navigation
│   ├── main.tsx                  # Application entry point
│   │
│   ├── components/              # React components
│   │   ├── agents/              # Agent screen components
│   │   │   ├── welcome-agent.tsx
│   │   │   ├── calibration-agent.tsx
│   │   │   └── swdev-agent.tsx
│   │   │
│   │   ├── animations/          # Loading & connection animations
│   │   │   ├── cloud-connecting-animation.tsx
│   │   │   ├── ascmo-connection-animation.tsx
│   │   │   └── ...
│   │   │
│   │   ├── ui/                  # ShadCN UI component library (48 components)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   ├── settings/            # Settings panel components
│   │   │   ├── theme-tab.tsx    # Theme customization
│   │   │   ├── app-tab.tsx      # Application settings
│   │   │   ├── layout-tab.tsx   # Layout preferences
│   │   │   └── import-export-tab.tsx
│   │   │
│   │   ├── etas-button.tsx      # ETAS branded button component
│   │   ├── etas-header.tsx       # Application header with branding
│   │   ├── etas-card.tsx         # ETAS styled card component
│   │   ├── chat-bubble.tsx       # Chat message bubbles
│   │   ├── chat-dock.tsx         # Resizable chat interface
│   │   └── ...                  # Other specialized components
│   │
│   ├── context/                  # React Context providers
│   │   └── ConfigContext.tsx    # Global configuration & theme management
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useChatAutoScroll.ts # Auto-scroll chat functionality
│   │
│   ├── lib/                      # Utility libraries
│   │   ├── config-manager.ts    # Configuration persistence & import/export
│   │   └── theme-manager.ts     # Dynamic theme & CSS variable management
│   │
│   ├── types/                    # TypeScript type definitions
│   │   └── config.ts            # Configuration type interfaces
│   │
│   └── styles/                   # Global styles
│       └── globals.css          # ETAS CI 2.0 design tokens & Tailwind imports
│
├── public/                       # Static assets (served from root)
│   ├── assets/
│   │   └── images/              # All images (SVG, PNG, JPG)
│   │       ├── ETAS_Logo_White.svg
│   │       ├── azure-logo.png
│   │       ├── TorqueAscmo.png
│   │       └── ...
│   │
│   ├── reports/                  # HTML report files
│   │   ├── EATB_preOpt_standalone.html
│   │   └── EATB_results_PostOpt.html
│   │
│   └── ui-config.json           # Default UI configuration
│
├── ui-bundle-etas-ci-2.0/       # ETAS CI 2.0 design system assets
│   ├── font/                     # Manrope font files (.woff)
│   ├── css/                     # Design system CSS
│   └── img/                      # Design system images
│
├── docs/                         # Documentation
│   ├── configuration/           # Configuration guides
│   ├── HOW_TO_RUN.md           # Detailed setup instructions
│   ├── FONT_SETUP.md            # Font configuration guide
│   └── ...
│
├── dist/                         # Production build output (generated)
│
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.ts               # Vite build tool configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies & scripts
├── Dockerfile                   # Production Docker container
├── Dockerfile.dev              # Development Docker container
├── docker-compose.yml          # Multi-environment orchestration
├── run-website.command         # macOS quick start script (double-click to run)
├── run-website-windows.bat     # Windows quick start script (double-click to run)
├── run-website.sh              # Linux quick start script
└── README.md                    # This file
```

---

## 🎨 Design System Guide (For Designers)

This application uses the **ETAS CI 2.0** design system. All design tokens are centralized and easy to modify.

### Where to Modify Design Elements

#### 1. Colors

**Location:** `src/styles/globals.css` (lines 22-62)

All colors are defined as CSS variables in the `:root` selector:

```css
:root {
  /* ETAS CI 2.0 Primary Colors */
  --primary: #164293;              /* ETAS Blue */
  --secondary: #89037A;            /* Purple */
  --success: #039C7D;
  --error: #E5004A;
  --warning: #FCCD22;
  
  /* Background Colors */
  --background: #fff;
  --surface-50: #FAFAFA;
  --muted: #FAFAFA;
  
  /* Text Colors */
  --foreground: #333;
  --gray-900: #5A646E;
}
```

**To change colors:**
1. Open `src/styles/globals.css`
2. Find the color variable you want to change
3. Update the hex value
4. Save - changes appear instantly in development mode

**Example:** To change the primary blue color:
```css
--primary: #164293;  /* Change to your desired color */
```

#### 2. Typography

**Location:** `src/styles/globals.css` (lines 64-82)

**Font Family:**
- **Primary:** Manrope (400, 600 weights)
- **Monospace:** Fira Mono

**Font files:** Located in `ui-bundle-etas-ci-2.0/font/`

**To change fonts:**
1. Add new font files to `public/fonts/` or `ui-bundle-etas-ci-2.0/font/`
2. Add `@font-face` declarations in `src/styles/globals.css`:
```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/your-font.woff') format('woff');
  font-weight: 400;
}
```
3. Update `tailwind.config.js` line 70:
```javascript
fontFamily: {
  sans: ['YourFont', 'sans-serif'],
}
```

**Font Sizes:** Defined in `src/styles/globals.css` (lines 64-82) and `tailwind.config.js` (lines 73-82)

```css
--text-xs: 14px;    /* Extra small */
--text-sm: 16px;    /* Small */
--text-base: 16px;  /* Base */
--text-lg: 18px;    /* Large */
--text-xl: 20px;    /* Extra large */
--text-2xl: 24px;   /* 2X large */
```

#### 3. Spacing

**Location:** `tailwind.config.js` (lines 84-95)

The spacing system uses an 8px base grid (tightened by 20%):

```javascript
spacing: {
  '1': '4px',   // 0.5 * 8px
  '2': '8px',   // 1 * 8px
  '3': '10px',  // 1.25 * 8px
  '4': '12px',  // 1.5 * 8px
  '5': '16px',  // 2 * 8px
  '6': '20px',  // 2.5 * 8px
  '8': '26px',  // 3.25 * 8px
  '10': '32px', // 4 * 8px
}
```

**To change spacing:**
1. Open `tailwind.config.js`
2. Modify values in the `spacing` object
3. Restart development server: `npm run dev`

#### 4. Border Radius

**Location:** `src/styles/globals.css` (lines 100-103)

```css
--radius: 50px;      /* Buttons (pill shape) */
--radius-md: 8px;    /* Cards, containers */
--radius-sm: 3px;    /* Small elements */
```

**To change border radius:**
1. Open `src/styles/globals.css`
2. Update the `--radius` variables
3. Changes apply automatically

#### 5. Breakpoints (Responsive Design)

**Location:** `tailwind.config.js` (lines 8-13)

```javascript
screens: {
  'sm': '640px',   // Small devices (tablets)
  'md': '1024px',  // Medium devices (desktops)
  'lg': '1440px',  // Large devices (large desktops)
}
```

**Usage in components:**
```tsx
<div className="text-sm md:text-lg lg:text-xl">
  Responsive text
</div>
```

### Using the Settings Panel

The application includes a built-in settings panel for non-technical customization:

1. **Click the gear icon (⚙️)** in the top-right header
2. **Theme Tab:** Adjust colors, fonts, and spacing
3. **App Tab:** Configure application settings
4. **Layout Tab:** Adjust layout preferences
5. **Import/Export:** Save or load configurations

Changes are saved to browser localStorage and persist across sessions.

---

## 🔧 Development Guide

### Available Scripts

```bash
npm run dev          # Start development server (http://localhost:1580)
npm run build        # Build for production (outputs to ./dist/)
npm run build:check  # Build with TypeScript type checking
npm run preview      # Preview production build locally
npm run lint         # Run ESLint code quality checks
```

**Platform-Specific Quick Start Scripts:**
```bash
# macOS
./run-website.command          # Double-click in Finder or run from terminal

# Windows
run-website-windows.bat        # Double-click in File Explorer or run from CMD

# Linux
./run-website.sh               # Run from terminal
```

### Development Workflow

1. **Start Development Server**

   **Platform-specific scripts (recommended):**
   - **macOS:** `./run-website.command` or double-click in Finder
   - **Windows:** `run-website-windows.bat` or double-click in File Explorer
   - **Linux:** `./run-website.sh`

   **Or use npm directly (all platforms):**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit files in `src/`
   - Changes appear instantly (hot module replacement)
   - Browser auto-refreshes on save

3. **Add New Components**
   - Create component in `src/components/`
   - Import and use in `App.tsx` or other components
   - Follow existing component patterns

4. **Add Images**
   - Place images in `public/assets/images/`
   - Reference as `/assets/images/your-image.png` in code

5. **Test Production Build**
   ```bash
   npm run build
   npm run preview
   ```

### Key Files to Understand

- **`src/App.tsx`** - Main router, handles screen navigation
- **`src/components/etas-button.tsx`** - Reusable button component
- **`src/styles/globals.css`** - All design tokens
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`vite.config.ts`** - Build tool configuration

### Code Style

- **TypeScript** - All components use TypeScript
- **Functional Components** - Use React hooks (no class components)
- **Tailwind CSS** - Use utility classes, avoid inline styles
- **Component Structure** - One component per file

---

## 📦 Production Deployment

Detailed instructions for Azure deployment are available in [docs/AZURE_DEPLOYMENT.md](docs/AZURE_DEPLOYMENT.md).

### Option 1: Native Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy ./dist/ folder to your web server
# (Nginx, Apache, AWS S3, Azure Static Web Apps, etc.)
```

### Option 2: Docker Production

```bash
# Build and run production container
docker-compose --profile prod up -d

# Access at http://localhost:80
```

### Option 3: Nvidia Jetson Deployment

```bash
# Deploy to Jetson (ARM64 optimized)
docker-compose --profile jetson up -d

# Includes memory limits optimized for Jetson hardware
```

---

## 🐳 Docker Usage

### Development Environment

```bash
# Start development with hot reload
docker-compose --profile dev up

# Stop development environment
docker-compose --profile dev down
```

### Production Environment

```bash
# Build and start production
docker-compose --profile prod up -d

# View logs
docker-compose logs -f etas-prod

# Stop production
docker-compose --profile prod down
```

---

## 🔍 Troubleshooting

### Common Issues

**"Port 1580 already in use"**
```bash
# Option 1: Stop the process using port 1580
lsof -ti:1580 | xargs kill -9

# Option 2: Change port in vite.config.ts
server: {
  port: 3000,  # Change to different port
}
```

**"Module not found" errors**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**"Images not loading"**
- Ensure images are in `public/assets/images/`
- Reference as `/assets/images/filename.png` (leading slash required)
- Check browser console for 404 errors

**"Design changes not appearing"**
- Restart development server: `npm run dev`
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- Check `src/styles/globals.css` for correct variable names

**"TypeScript errors"**
```bash
# Check TypeScript compilation
npm run build:check

# Fix common issues:
# - Check import paths
# - Verify type definitions
# - Ensure all props are typed
```

**"Tailwind classes not working"**
- Verify class names in `tailwind.config.js` content paths
- Restart development server
- Check for typos in class names

### Getting Help

1. **Check Documentation**
   - `/docs/HOW_TO_RUN.md` - Detailed setup guide
   - `/docs/FONT_SETUP.md` - Font configuration
   - `/docs/IMAGE_SETUP.md` - Image setup guide

2. **Check Console**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

3. **Verify Installation**
   ```bash
   node --version  # Should be >= 18.0.0
   npm --version   # Should be >= 8.0.0
   ```

---

## 📚 Additional Resources

### Documentation Files

- **`docs/HOW_TO_RUN.md`** - Complete setup instructions
- **`docs/FONT_SETUP.md`** - Font configuration details
- **`docs/IMAGE_SETUP.md`** - Image asset management
- **`docs/QUICK_START.md`** - Quick reference guide
- **`docs/AZURE_DEPLOYMENT.md`** - Azure deployment guide
- **`docs/configuration/`** - Configuration system documentation

### External Resources

- **ETAS Official:** https://www.etas.com
- **React Documentation:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org
- **Tailwind CSS:** https://tailwindcss.com
- **Vite:** https://vitejs.dev

---

## 🎯 Quick Reference

### Development URLs

- **Development:** http://localhost:1580
- **Production Preview:** http://localhost:4173
- **Docker Production:** http://localhost:80

### Important Paths

- **Components:** `src/components/`
- **Styles:** `src/styles/globals.css`
- **Images:** `public/assets/images/`
- **Config:** `tailwind.config.js`
- **Build Output:** `dist/`

### Design Tokens Location

- **Colors:** `src/styles/globals.css` (lines 22-62)
- **Typography:** `src/styles/globals.css` (lines 64-82)
- **Spacing:** `tailwind.config.js` (lines 84-95)
- **Breakpoints:** `tailwind.config.js` (lines 8-13)

---

**Version:** 1.0  
**Last Updated:** November 2024  
**Status:** ✅ Production Ready  
**Design System:** ETAS CI 2.0  
**Platforms:** MacBook Pro + Nvidia Jetson Compatible

**Happy coding! 🚀**
