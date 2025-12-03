# ETAS Quick Reference Card

**One-page cheat sheet for developers**  
**Print or bookmark this page for instant reference**

---

## 🎨 Colors

```css
/* Brand */
#164293  /* Primary (ETAS Blue) */
#89037A  /* Secondary (Purple) */
#FAFAFA  /* Background */
#5A646E  /* Text */

/* Semantic */
#039C7D  /* Success */
#E5004A  /* Error */
#FCCD22  /* Warning */

/* Gradient */
background: linear-gradient(to right, #164293, #89037A);
```

---

## 📝 Typography

```css
/* Font Families */
font-family: 'Manrope', sans-serif;
font-family: 'Fira Mono', monospace;

/* Weights */
400  /* Regular */
600  /* Semibold */
800  /* Extrabold */

/* Sizes (14px base) */
10px, 12px, 14px, 16px, 18px, 24px, 28px, 36px, 48px

/* Line Heights */
Match size: 16px, 18px, 20px, 22px, 24px, 32px, 36px, 44px, 56px
```

---

## 📏 Spacing (8px Grid)

```css
4px, 8px, 12px, 16px, 20px, 32px

/* Common Usage */
gap-2      /* 8px */
gap-3      /* 12px */
p-3        /* 12px */
p-4        /* 16px */
px-2       /* 8px horizontal */
```

---

## 📱 Breakpoints

```css
sm:   640px+   /* Tablet */
md:   1024px+  /* Desktop */
lg:   1440px+  /* Large desktop */
```

---

## 🧩 Component Sizes

```css
Header:  56px (h-14)
Button:  40px (h-10)
Input:   38px (h-9)
Card:    16px padding (p-4)
Radius:  8px (rounded-lg)
```

---

## 🎬 Animations

```css
/* Duration */
200ms  /* Fast (buttons) */
250ms  /* Normal (panels) */

/* Easing */
ease-in-out

/* Scale */
hover: 1.02
active: 0.98
```

---

## 🗂️ File Structure

```
/App.tsx                    # Router
/styles/globals.css         # Design tokens
/components/
  [page].tsx               # Pages (10)
  etas-*.tsx               # ETAS components
  ui/                      # ShadCN (40+)
```

---

## 🎯 Component Props

```typescript
// ETASHeader
{ title?: string, onNavigate?: (screen: string) => void }

// ChatDock
{ className?: string, onChatActiveChange?: (isActive: boolean) => void }

// CollapsiblePanel
{ children, isMinimized: boolean, onRestore: () => void, type?: 'options' | 'animation' }

// ETASButton
{ children, onClick?: () => void, icon?: ReactNode, variant?: 'primary' }
```

---

## 📊 Common Patterns

### Responsive Flex
```tsx
<div className="flex flex-col lg:flex-row gap-2">
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
```

### Responsive Padding
```tsx
<div className="p-3 md:p-4 lg:p-6">
```

### Hide on Mobile
```tsx
<div className="hidden lg:block">
```

---

## 🎨 Tailwind Classes

```tsx
/* Colors */
bg-[#164293]
text-[#5A646E]

/* Spacing */
gap-2 px-2 py-2 p-3 p-4

/* Sizing */
w-full h-full flex-1 flex-[0.6]

/* Border */
rounded-lg rounded-[15px] rounded-full

/* Shadow */
shadow-sm shadow-md shadow-lg shadow-xl

/* Layout */
flex flex-col flex-row items-center justify-between

/* Position */
fixed absolute relative top-0 bottom-4 right-4

/* Responsive */
sm:grid-cols-2 lg:w-1/3 md:p-4
```

---

## 🔧 Key Interactions

**ChatDock Focus → Minimize Panels:**
```tsx
<ChatDock onChatActiveChange={setIsPanelMinimized} />
<CollapsiblePanel isMinimized={isPanelMinimized} />
```

**Panel Restore:**
```tsx
<CollapsiblePanel onRestore={() => setIsPanelMinimized(false)} />
```

**Navigation:**
```tsx
<button onClick={() => onNavigate('page-name')}>
```

---

## 📦 Imports

```tsx
// Icons
import { IconName } from 'lucide-react';

// Components
import { ETASHeader } from './components/etas-header';
import { ChatDock } from './components/chat-dock';

// UI Components
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

// Animation
import { motion } from 'motion/react';
```

---

## 🚦 Z-Index Layers

```css
0    /* Base */
10   /* Dropdown */
20   /* Sticky */
50   /* Header */
100  /* Modal */
```

---

## ✅ Checklist

**Before committing:**
- [ ] Responsive (test at 375px, 768px, 1024px)
- [ ] Touch targets ≥44px (mobile)
- [ ] No Tailwind font classes (text-xl, font-bold)
- [ ] 8px spacing grid followed
- [ ] Design tokens used (not arbitrary values)
- [ ] TypeScript interfaces for props
- [ ] No horizontal scroll

---

## 📞 Documentation

**Quick Start:** [HANDOFF_README.md](HANDOFF_README.md)  
**Full Reference:** [DEV_NOTES.md](DEV_NOTES.md)  
**Components:** [COMPONENT_SPECS.md](COMPONENT_SPECS.md)  
**Tokens:** [DESIGN_TOKENS.md](DESIGN_TOKENS.md)  
**Responsive:** [RESPONSIVE_GUIDE.md](RESPONSIVE_GUIDE.md)

---

## 🎯 Common Tasks

**Create a button:**
```tsx
<ETASButton
  icon={<Icon className="w-4 h-4" />}
  onClick={() => action()}
>
  Button Text
</ETASButton>
```

**Create a card:**
```tsx
<div className="bg-white rounded-[15px] shadow-lg p-4">
  Card Content
</div>
```

**Create responsive layout:**
```tsx
<div className="flex-[0.6] flex flex-col lg:flex-row gap-2 px-2 pt-2 pb-0">
  <div className="flex-1">Left</div>
  <div className="lg:w-1/3">Right</div>
</div>
```

**Add gradient background:**
```tsx
<div className="gradient-etas">Content</div>
```

---

## 🐛 Troubleshooting

**Spacing looks wrong?**
→ Check 8px grid (use gap-2, p-3, p-4)

**Colors don't match?**
→ Use design tokens: `bg-[#164293]` not `bg-blue-700`

**Font size wrong?**
→ Avoid Tailwind font classes, use default (14px)

**Panel not collapsing?**
→ Check `isMinimized` state & `onChatActiveChange` prop

**Layout not responsive?**
→ Use mobile-first: base styles, then `sm:`, `md:`, `lg:`

---

**Version:** 1.0  
**Last Updated:** October 17, 2025  
**Status:** ✅ Ready to Use
