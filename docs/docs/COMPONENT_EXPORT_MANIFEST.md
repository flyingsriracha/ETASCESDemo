# Component Export Manifest

**ETAS CES Demonstrator - Component Export Registry**  
**Export Format:** React + TypeScript + Tailwind CSS  
**Custom Breakpoints:** sm: 640px / md: 1024px / lg: 1440px  
**Last Updated:** October 17, 2025

---

## 🎯 Master Components for Export

### Core Layout Components

#### 1. ETASHeader ✅
**File:** `/components/etas-header.tsx`  
**Export Priority:** HIGH  
**Component Type:** Layout (Fixed Navigation)

```tsx
export const ETASHeader: React.FC<{
  title?: string;
  onNavigate?: (screen: string) => void;
}>
```

**Dependencies:**
- None (standalone)

**Props:**
- `title` (optional): string - Header title text
- `onNavigate` (optional): (screen: string) => void - Navigation callback

**Styling:**
- Fixed position: `fixed top-0 left-0 right-0 z-50`
- Height: 56px (`h-14`)
- Background: Gradient (blue → purple)
- Responsive: Logo scales, title centered

**Export Notes:**
- Ready for static export
- No state dependencies
- Can be used in any page layout

---

#### 2. ChatDock ✅
**File:** `/components/chat-dock.tsx`  
**Export Priority:** HIGH  
**Component Type:** Interactive (Chat Interface)

```tsx
export const ChatDock: React.FC<{
  className?: string;
  onChatActiveChange?: (isActive: boolean) => void;
}>
```

**Dependencies:**
- `re-resizable` (resizable container)
- `lucide-react` (icons: Send, Settings)
- `./chat-settings-modal` (settings overlay)
- `./ui/utils` (cn utility)

**Props:**
- `className` (optional): string - Additional CSS classes
- `onChatActiveChange` (optional): (isActive: boolean) => void - State change callback

**State:**
- `inputValue`: string - Input field value
- `messages`: Array<{type, text}> - Message history
- `isSettingsOpen`: boolean - Settings modal state
- `isChatActive`: boolean - Active/focused state
- `chatHeight`: number - Current height (resizable)

**Styling:**
- Default height: 200px
- Min height: 150px
- Max height: 600px
- Resizable via top handle
- Responsive: Full width at all breakpoints

**Export Notes:**
- Requires `re-resizable` package
- Contains complex interaction logic
- State can be lifted to parent if needed

---

#### 3. CollapsiblePanel ✅
**File:** `/components/collapsible-panel.tsx`  
**Export Priority:** HIGH  
**Component Type:** Animation (Collapsible Container)

```tsx
export const CollapsiblePanel: React.FC<{
  children: React.ReactNode;
  isMinimized: boolean;
  onRestore: () => void;
  className?: string;
  type?: 'options' | 'animation';
}>
```

**Dependencies:**
- `motion/react` (Framer Motion - animations)
- `lucide-react` (icons: MessageCircle, ChevronDown)
- `./ui/utils` (cn utility)

**Props:**
- `children`: React.ReactNode - Panel content
- `isMinimized`: boolean - Collapse state
- `onRestore`: () => void - Restore callback
- `className` (optional): string - Additional CSS classes
- `type` (optional): 'options' | 'animation' - Panel type (default: 'options')

**State:**
- Controlled by parent via `isMinimized` prop

**Styling:**
- Animation: 250ms ease-in-out
- Minimized button: Gradient background with pulsing chevron
- Responsive: Full width, conditional visibility based on type

**Export Notes:**
- Requires `motion` (Framer Motion) package
- Animation can be replaced with CSS transitions if needed
- Type 'animation' panels hide completely on minimize

---

#### 4. ETASCard ✅
**File:** `/components/etas-card.tsx`  
**Export Priority:** MEDIUM  
**Component Type:** Container (Card Wrapper)

```tsx
export const ETASCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}>
```

**Dependencies:**
- None (standalone)

**Props:**
- `children`: React.ReactNode - Card content
- `className` (optional): string - Additional CSS classes

**Styling:**
- Background: White (`#FFFFFF`)
- Border radius: 15px (`rounded-[15px]`)
- Shadow: Large (`shadow-lg`)
- Padding: Responsive (12-16px)

**Export Notes:**
- Simple wrapper component
- No state or complex logic
- Easily customizable

---

#### 5. ETASButton ✅
**File:** `/components/etas-button.tsx`  
**Export Priority:** HIGH  
**Component Type:** Interactive (Action Button)

```tsx
export const ETASButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}>
```

**Dependencies:**
- `./ui/utils` (cn utility)

**Props:**
- `children`: React.ReactNode - Button text
- `onClick` (optional): () => void - Click handler
- `icon` (optional): React.ReactNode - Left-aligned icon
- `variant` (optional): 'primary' | 'secondary' - Button style (default: 'primary')
- `className` (optional): string - Additional CSS classes
- `disabled` (optional): boolean - Disabled state

**Styling:**
- Height: 40px (`h-10`)
- Background: Gradient (primary) or solid (secondary)
- Responsive: Icon size scales (12px mobile, 16px desktop)
- States: Default, hover, active, disabled

**Export Notes:**
- Highly reusable
- Can accept Lucide icons as `icon` prop
- Fully accessible (focus states, keyboard support)

---

### Supporting Components

#### 6. SectionContainer ✅
**File:** `/components/section-container.tsx`  
**Export Priority:** MEDIUM  
**Component Type:** Layout (Page Wrapper)

```tsx
export const SectionContainer: React.FC<{
  children: React.ReactNode;
}>
```

**Purpose:** Wraps page content, accounts for fixed header

**Styling:**
- Top margin: 56px (`mt-14` - clears fixed header)
- Min height: calc(100vh - 56px)
- Background: Inherited

---

#### 7. AnimationPlaceholder ✅
**File:** `/components/animation-placeholder.tsx`  
**Export Priority:** LOW  
**Component Type:** Media (Animation Slot)

```tsx
export const AnimationPlaceholder: React.FC<{
  label: string;
  width: number;
  height: number;
  resizable?: boolean;
  minWidth?: number;
  minHeight?: number;
}>
```

**Purpose:** Placeholder for Lottie/video/animation content

**Export Notes:**
- Replace with actual animation component in production
- Useful for design handoff and prototyping

---

#### 8. ChatBubble ✅
**File:** `/components/chat-bubble.tsx`  
**Export Priority:** MEDIUM  
**Component Type:** Display (Message Bubble)

```tsx
export const ChatBubble: React.FC<{
  type: 'user' | 'assistant';
  text: string;
}>
```

**Variants:**
- `user`: Right-aligned, blue background
- `assistant`: Left-aligned, gray background

---

#### 9. MetricCard ✅
**File:** `/components/metric-card.tsx`  
**Export Priority:** LOW  
**Component Type:** Display (Data Card)

```tsx
export const MetricCard: React.FC<{
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}>
```

**Purpose:** Display key metrics or data points

---

#### 10. ETASAvatar ✅
**File:** `/components/etas-avatar.tsx`  
**Export Priority:** LOW  
**Component Type:** Display (User Avatar)

```tsx
export const ETASAvatar: React.FC<{
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}>
```

**Sizes:**
- `sm`: 24px
- `md`: 32px (default)
- `lg`: 48px

---

## 📦 ShadCN UI Components (Pre-built)

**Location:** `/components/ui/`  
**Count:** 40+ components  
**Export Status:** ✅ Ready (import as needed)

### High-Priority UI Components

| Component | File | Usage |
|-----------|------|-------|
| Button | `ui/button.tsx` | Alternative to ETASButton |
| Card | `ui/card.tsx` | Alternative to ETASCard |
| Input | `ui/input.tsx` | Form inputs |
| Dialog | `ui/dialog.tsx` | Modal dialogs |
| Popover | `ui/popover.tsx` | Popovers, tooltips |
| Tabs | `ui/tabs.tsx` | Tabbed navigation |
| Select | `ui/select.tsx` | Dropdown selects |
| Checkbox | `ui/checkbox.tsx` | Checkboxes |
| Switch | `ui/switch.tsx` | Toggle switches |

**Import Pattern:**
```tsx
import { Button } from './components/ui/button';
import { Card, CardHeader, CardContent } from './components/ui/card';
```

---

## 🎨 Styling Dependencies

### Tailwind Configuration

**File:** `/tailwind.config.js`

**Custom Breakpoints:**
```javascript
screens: {
  'sm': '640px',   // Tablets
  'md': '1024px',  // Desktops
  'lg': '1440px',  // Large desktops
}
```

**Custom Colors:**
```javascript
colors: {
  'etas-blue': '#164293',
  'etas-purple': '#89037A',
  'surface-50': '#FAFAFA',
  'gray-900': '#5A646E',
  // ... (see tailwind.config.js)
}
```

### Global Styles

**File:** `/styles/globals.css`

**Design Tokens:**
- CSS custom properties for all colors, typography, spacing
- Base typography styles (h1, h2, p, etc.)
- Gradient utility class (`.gradient-etas`)

---

## 📋 Export Checklist by Component

### ETASHeader
- [x] TypeScript interface defined
- [x] Props documented
- [x] Responsive behavior implemented
- [x] No external state dependencies
- [x] Accessibility features (focus, ARIA)
- [x] Export statement present

### ChatDock
- [x] TypeScript interface defined
- [x] Props documented
- [x] State management clear
- [x] Resize functionality working
- [x] Dependencies listed (re-resizable)
- [x] Export statement present

### CollapsiblePanel
- [x] TypeScript interface defined
- [x] Props documented
- [x] Animation implementation (Motion)
- [x] Two types supported (options, animation)
- [x] Dependencies listed (motion/react)
- [x] Export statement present

### ETASCard
- [x] TypeScript interface defined
- [x] Props documented
- [x] Simple, reusable
- [x] No dependencies
- [x] Export statement present

### ETASButton
- [x] TypeScript interface defined
- [x] Props documented
- [x] All states implemented (hover, active, disabled)
- [x] Icon support
- [x] Accessibility features
- [x] Export statement present

---

## 🔧 Package Dependencies

### Required NPM Packages

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "motion": "latest",           // For CollapsiblePanel animations
    "re-resizable": "latest",     // For ChatDock resize
    "lucide-react": "latest",     // For icons
    "tailwindcss": "latest"       // For styling
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "vite": "latest"
  }
}
```

---

## 📐 Component Hierarchy Map

```
App.tsx (Router)
└── Page Components (10 total)
    ├── ETASHeader (on every page)
    ├── SectionContainer
    │   ├── CollapsiblePanel (options)
    │   │   └── ETASButton (grid)
    │   ├── CollapsiblePanel (animation)
    │   │   └── AnimationPlaceholder
    │   └── ChatDock
    │       ├── ChatBubble (multiple)
    │       └── ChatSettingsModal
    └── Floating Button (component library link)
```

---

## 🎯 Export Priorities

### Essential (Must Export)
1. **ETASHeader** - Every page needs this
2. **ChatDock** - Core interaction component
3. **CollapsiblePanel** - Key animation component
4. **ETASButton** - Primary action component

### Important (Should Export)
5. **ETASCard** - Common container
6. **SectionContainer** - Layout helper
7. **ChatBubble** - Message display

### Optional (Nice to Have)
8. **AnimationPlaceholder** - Design handoff tool
9. **MetricCard** - Data display
10. **ETASAvatar** - User representation

---

## 📤 Export Formats

### Option 1: NPM Package (Recommended)

```bash
# Package structure
etas-components/
├── src/
│   ├── index.ts              # Re-export all components
│   ├── ETASHeader.tsx
│   ├── ChatDock.tsx
│   ├── CollapsiblePanel.tsx
│   ├── ETASButton.tsx
│   └── ...
├── dist/                     # Compiled output
├── package.json
└── tsconfig.json
```

### Option 2: Direct File Export

Copy these files to new project:
```
components/
├── etas-header.tsx
├── chat-dock.tsx
├── collapsible-panel.tsx
├── etas-button.tsx
├── etas-card.tsx
├── section-container.tsx
├── chat-bubble.tsx
├── ui/                       # ShadCN components
└── figma/
    └── ImageWithFallback.tsx

styles/
└── globals.css

tailwind.config.js
```

### Option 3: Storybook Documentation

Export as Storybook stories:
```tsx
// ETASButton.stories.tsx
import { ETASButton } from './etas-button';

export default {
  title: 'Components/ETASButton',
  component: ETASButton,
};

export const Primary = () => (
  <ETASButton onClick={() => alert('Clicked')}>
    Click Me
  </ETASButton>
);
```

---

## 🧪 Component Testing Recommendations

### Unit Tests (Jest + React Testing Library)

```tsx
// etas-button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ETASButton } from './etas-button';

test('renders button with text', () => {
  render(<ETASButton>Click Me</ETASButton>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<ETASButton onClick={handleClick}>Click</ETASButton>);
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

## 📊 Component Complexity Matrix

| Component | Lines of Code | State Complexity | Dependencies | Reusability |
|-----------|---------------|------------------|--------------|-------------|
| ETASHeader | ~40 | Low | 0 | High |
| ChatDock | ~180 | High | 3 | Medium |
| CollapsiblePanel | ~70 | Medium | 2 | High |
| ETASCard | ~15 | Low | 0 | Very High |
| ETASButton | ~50 | Low | 1 | Very High |
| SectionContainer | ~10 | Low | 0 | Very High |

---

## ✅ Final Export Verification

**Before exporting, verify:**

1. [ ] All components have TypeScript interfaces
2. [ ] All props are documented
3. [ ] All dependencies are listed in package.json
4. [ ] All components use custom breakpoints (sm/md/lg)
5. [ ] All components are responsive
6. [ ] No hardcoded dimensions (use Tailwind classes)
7. [ ] Accessibility features present (ARIA, keyboard)
8. [ ] Export statements present in all files
9. [ ] No console.log statements in production code
10. [ ] All assets (images, icons) paths are correct

---

**Status:** ✅ **READY FOR EXPORT**  
**Format:** React + TypeScript + Tailwind CSS  
**Components Marked:** 10 master components  
**Documentation:** Complete  
**Last Verified:** October 17, 2025
