# ETAS CES Demonstrator

**Design System:** ETAS Compact UI v1  
**Framework:** React 18 + TypeScript + Tailwind CSS  
**Export Status:** ✅ Ready for Developer Handoff  
**Custom Breakpoints:** sm: 640px / md: 1024px / lg: 1440px

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Development server:** http://localhost:5173

---

## 📚 Documentation

### 🎯 Start Here (Pick Your Path)

**If you're a developer starting to code:**
→ Read **[HANDOFF_README.md](HANDOFF_README.md)** first  
→ Then **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** for quick lookup

**If you're exporting this for production:**
→ Read **[EXPORT_READY_SUMMARY.md](EXPORT_READY_SUMMARY.md)** first  
→ Then **[EXPORT_GUIDE.md](EXPORT_GUIDE.md)** for technical details

**If you're preparing a Figma handoff:**
→ Read **[EXPORT_CHECKLIST.md](EXPORT_CHECKLIST.md)** first  
→ Then **[COMPONENT_EXPORT_MANIFEST.md](COMPONENT_EXPORT_MANIFEST.md)**

---

### 📖 Complete Documentation Index

#### Essential Documentation (Read First)

| File | Purpose | When to Use |
|------|---------|-------------|
| **[EXPORT_READY_SUMMARY.md](EXPORT_READY_SUMMARY.md)** | Export status & verification | ✅ **START HERE for export** |
| **[HANDOFF_README.md](HANDOFF_README.md)** | Quick start & orientation | 👋 **START HERE for development** |
| **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** | One-page cheat sheet | 🔖 **Bookmark this** |

#### Technical Specifications

| File | Purpose | Lines | When to Use |
|------|---------|-------|-------------|
| **[DEV_NOTES.md](DEV_NOTES.md)** | Complete system overview | 450+ | System architecture, design tokens, page structure |
| **[COMPONENT_SPECS.md](COMPONENT_SPECS.md)** | Component library reference | 800+ | Building/modifying components |
| **[DESIGN_TOKENS.md](DESIGN_TOKENS.md)** | Token library (colors, typography, spacing) | 600+ | Styling, consistency |
| **[RESPONSIVE_GUIDE.md](RESPONSIVE_GUIDE.md)** | Responsive patterns | 700+ | Implementing responsive layouts |

#### Export & Handoff

| File | Purpose | Lines | When to Use |
|------|---------|-------|-------------|
| **[EXPORT_GUIDE.md](EXPORT_GUIDE.md)** | Export configuration & Next.js migration | 800+ | Exporting to production, framework migration |
| **[COMPONENT_EXPORT_MANIFEST.md](COMPONENT_EXPORT_MANIFEST.md)** | Component export registry | 600+ | Component packaging, NPM export |
| **[EXPORT_CHECKLIST.md](EXPORT_CHECKLIST.md)** | Handoff preparation guide | 900+ | Preparing Figma for handoff |
| **[HANDOFF_SUMMARY.md](HANDOFF_SUMMARY.md)** | Completion summary | 500+ | Handoff verification |

#### Visual Reference

| File | Purpose | Lines | When to Use |
|------|---------|-------|-------------|
| **[LAYOUT_DIAGRAMS.md](LAYOUT_DIAGRAMS.md)** | Visual layout diagrams (ASCII art) | 550+ | Understanding component structure |

**Total Documentation:** 12 files, ~5,800 lines

---

## 🧩 Component Library

### Master Components (Export Ready)

| Component | File | Type | Status |
|-----------|------|------|--------|
| **ETASHeader** | `etas-header.tsx` | Layout | ✅ Ready |
| **ChatDock** | `chat-dock.tsx` | Interactive | ✅ Ready |
| **CollapsiblePanel** | `collapsible-panel.tsx` | Animation | ✅ Ready |
| **ETASCard** | `etas-card.tsx` | Container | ✅ Ready |
| **ETASButton** | `etas-button.tsx` | Interactive | ✅ Ready |
| **SectionContainer** | `section-container.tsx` | Layout | ✅ Ready |
| **AnimationPlaceholder** | `animation-placeholder.tsx` | Media | ✅ Ready |
| **ChatBubble** | `chat-bubble.tsx` | Display | ✅ Ready |
| **MetricCard** | `metric-card.tsx` | Display | ✅ Ready |
| **ETASAvatar** | `etas-avatar.tsx` | Display | ✅ Ready |

**Total:** 10 master components + 40+ ShadCN UI components

**See:** [COMPONENT_SPECS.md](COMPONENT_SPECS.md) for detailed specifications

---

## 🎨 Design System

### ETAS Compact UI v1

**Philosophy:** Maximum information density without sacrificing usability

**Key Features:**
- 14px base font size (reduced from standard 16px)
- 8px spacing grid (reduced from 12px)
- 20% tighter vertical spacing
- Compact component heights

### Color Palette

```css
/* Brand Colors */
Primary:    #164293  /* ETAS Blue */
Secondary:  #89037A  /* Purple */
Background: #FAFAFA  /* Surface */
Text:       #5A646E  /* Gray */

/* Semantic */
Success:    #039C7D
Error:      #E5004A
Warning:    #FCCD22

/* Gradient */
background: linear-gradient(to right, #164293, #89037A);
```

### Typography

**Fonts:**
- Manrope (400, 600, 800) - Primary
- Fira Mono (400) - Monospace

**Type Scale:** 10px, 12px, **14px (base)**, 16px, 18px, 24px, 28px, 36px, 48px

### Spacing (8px Grid)

```
4px, 8px, 12px, 16px, 20px, 32px
```

**See:** [DESIGN_TOKENS.md](DESIGN_TOKENS.md) for complete token library

---

## 📱 Responsive Design

### Custom Breakpoints

```javascript
// tailwind.config.js
screens: {
  'sm': '640px',   // Tablets
  'md': '1024px',  // Desktops
  'lg': '1440px',  // Large desktops
}
```

**Note:** These are **custom breakpoints**, different from Tailwind defaults!

### Layout Strategy

| Breakpoint | Min Width | Devices | Layout |
|-----------|-----------|---------|--------|
| Base | 0px | Mobile | Single column, stacked |
| sm | 640px | Tablets | 2 columns, flexible |
| md | 1024px | Desktops | Multi-column, side-by-side |
| lg | 1440px | Large screens | Max 1440px, centered |

**See:** [RESPONSIVE_GUIDE.md](RESPONSIVE_GUIDE.md) for responsive patterns

---

## 🗂️ Project Structure

```
/
├── App.tsx                    # Main router
├── main.tsx                   # Entry point
├── index.html                 # HTML template
│
├── components/
│   ├── welcome-agent.tsx      # Pages (10 total)
│   ├── calibration-agent.tsx
│   ├── swdev-agent.tsx
│   ├── ...
│   │
│   ├── etas-header.tsx        # Layout components
│   ├── chat-dock.tsx          # Interactive components
│   ├── collapsible-panel.tsx  # Animation components
│   ├── ...
│   │
│   └── ui/                    # ShadCN components (40+)
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
│
├── styles/
│   └── globals.css            # Design tokens, typography
│
├── docs/
│   ├── README.md (this file)
│   ├── tailwind.config.js     # Custom breakpoints & colors
│   └── [Documentation files]  # 12 comprehensive guides
│
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

---

## 🎯 Key Features

### 1. Dynamic Panel Minimization
- ChatDock focus → Panels minimize
- Smooth 250ms animations
- "Show Options" button → Restore panels

### 2. Resizable ChatDock
- Vertical drag handle
- Min: 150px, Max: 600px, Default: 200px
- Visual feedback on hover

### 3. Responsive Layout
- Mobile: Stacked, single column
- Tablet: Flexible 2-column
- Desktop: Side-by-side with animation panel
- Large: Max width 1440px, centered

### 4. Fixed Header
- Always visible (z-index: 50)
- Full-screen width
- Gradient background
- Clickable logo navigation

---

## 🔧 Tech Stack

### Core
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling (custom breakpoints)
- **Vite** - Build tool

### Libraries
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icons
- **re-resizable** - Resizable components
- **ShadCN** - UI component library

### Fonts
- **Manrope** - Google Fonts
- **Fira Mono** - Google Fonts

---

## 📦 Export Options

### Option 1: Direct File Export (Current Setup)
Copy components folder → Import in your React project

### Option 2: Next.js Migration
Full migration guide in [EXPORT_GUIDE.md](EXPORT_GUIDE.md)

### Option 3: NPM Package
Package as reusable component library

**See:** [EXPORT_GUIDE.md](EXPORT_GUIDE.md) for detailed export instructions

---

## ✅ Export Verification

### All Requirements Met

- [x] **Export:** React components (not HTML)
- [x] **Framework:** Vite + React (Next.js ready)
- [x] **CSS:** Tailwind with custom config
- [x] **Breakpoints:** sm: 640px / md: 1024px / lg: 1440px
- [x] **Optimization:** Auto-Layout → Flexbox ✅
- [x] **Optimization:** Constraints → Responsive ✅
- [x] **Images:** SVG optimized (logo, icons)
- [x] **Components:** All marked for export (10 master components)

---

## 🎓 Learning Path

### For New Developers

1. **Day 1:** Read [HANDOFF_README.md](HANDOFF_README.md) → Quick overview
2. **Day 1:** Skim [QUICK_REFERENCE.md](QUICK_REFERENCE.md) → Bookmark for reference
3. **Day 2:** Read [DEV_NOTES.md](DEV_NOTES.md) → Understand system architecture
4. **Day 2:** Test responsive behavior (resize browser)
5. **Week 1:** Build first feature using existing components
6. **Week 2:** Deep dive into [COMPONENT_SPECS.md](COMPONENT_SPECS.md)

### For Export/Deployment

1. **Step 1:** Read [EXPORT_READY_SUMMARY.md](EXPORT_READY_SUMMARY.md) → Verify status
2. **Step 2:** Read [EXPORT_GUIDE.md](EXPORT_GUIDE.md) → Choose export path
3. **Step 3:** Follow migration steps (if using Next.js)
4. **Step 4:** Run build, test, deploy

---

## 📞 Support

### Documentation Questions?

**Design System:** → [DESIGN_TOKENS.md](DESIGN_TOKENS.md)  
**Components:** → [COMPONENT_SPECS.md](COMPONENT_SPECS.md)  
**Layout:** → [RESPONSIVE_GUIDE.md](RESPONSIVE_GUIDE.md)  
**Export:** → [EXPORT_GUIDE.md](EXPORT_GUIDE.md)

### Common Issues

**"Spacing looks wrong"**  
→ Verify 8px grid usage (gap-2 = 8px, p-3 = 12px, p-4 = 16px)

**"Breakpoints not working"**  
→ Check custom breakpoints: sm: 640px (not 640px), md: 1024px (not 768px)

**"Colors don't match"**  
→ Use design tokens: `bg-[#164293]` not `bg-blue-700`

**"Panel collapse not working"**  
→ Review [DEV_NOTES.md](DEV_NOTES.md) interaction logic section

---

## 🎉 Ready to Use!

**Status:** ✅ **100% Complete & Export Ready**

**What's Included:**
- ✅ Production-ready React codebase
- ✅ 10 master components + 40+ UI components
- ✅ Complete design system
- ✅ 12 comprehensive documentation files
- ✅ Custom Tailwind configuration
- ✅ Responsive layouts (custom breakpoints)
- ✅ Export guides (React, Next.js, NPM)

**Get Started:**
```bash
npm install && npm run dev
```

**Happy coding! 🚀**

---

## 📄 Documentation Quick Links

**Essential:**
- [EXPORT_READY_SUMMARY.md](EXPORT_READY_SUMMARY.md) - Export verification
- [HANDOFF_README.md](HANDOFF_README.md) - Developer quick start
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - One-page cheat sheet

**Technical:**
- [DEV_NOTES.md](DEV_NOTES.md) - System overview
- [COMPONENT_SPECS.md](COMPONENT_SPECS.md) - Component details
- [DESIGN_TOKENS.md](DESIGN_TOKENS.md) - Design tokens
- [RESPONSIVE_GUIDE.md](RESPONSIVE_GUIDE.md) - Responsive patterns

**Export:**
- [EXPORT_GUIDE.md](EXPORT_GUIDE.md) - Export configuration
- [COMPONENT_EXPORT_MANIFEST.md](COMPONENT_EXPORT_MANIFEST.md) - Component registry
- [EXPORT_CHECKLIST.md](EXPORT_CHECKLIST.md) - Handoff checklist

**Visual:**
- [LAYOUT_DIAGRAMS.md](LAYOUT_DIAGRAMS.md) - Layout diagrams

---

**Version:** 1.0  
**Last Updated:** October 17, 2025  
**Prepared By:** Figma Make  
**Status:** Production Ready
