# ETAS CES Demonstrator - Navigation Map & Design Notes

## Navigation Flow

### 1_Welcome_Agent (Entry Point)
**Routes:**
- "View ETAS-Azure Marketplace..." → `External_Landing_Page` (placeholder for external link)
- "Talk to Calibration & Data Analytics Agent" → `2_Calibration_Agent`
- "Talk to SW Development Agent" → `3_SWDev_Agent`
- Component Library link → `ETAS_Component_Library`

**PDF References:** p.10-12 (Agent selection and welcome flow)

---

### 2_Calibration_Agent
**Routes:**
- "Initiate AI Calibration Suite" → `2.1_Calibration_Suite_Orchestrator`
- "Initiate Virtual Calibration of VECU" → `2.2_Virtual_Calibration_Orchestrator`
- "Analyze Data from Fleet Loggers" → `2.3_Data_Logging_Orchestrator`

**Back Navigation:**
- "Back to Welcome" → `1_Welcome_Agent`

**PDF References:** p.15-22 (Calibration workflows)

---

### 2.1_Calibration_Suite_Orchestrator
**Conversation Flow:**
1. "Continue with Torque Model" / "Start new Activity"
2. "Connecting to Cloud…" → Animation: `ANIMATION_CAL_SUITE_FLOW`
3. "Model ready. Optimize using ASCMO-AI?"
4. "Yes, Optimize" / "No, Skip"

**Back Navigation:**
- "Back to Calibration Agent" → `2_Calibration_Agent`
- "Back to Welcome" → `1_Welcome_Agent`

**Animation Placeholder:** `ANIMATION_CAL_SUITE_FLOW` (960×540)
- Future: Replace with Lottie animation showing torque model processing

---

### 2.2_Virtual_Calibration_Orchestrator
**Conversation Flow:**
1. "Build Type-3 Virtual ECU FMU?"
2. "Yes, Build FMU" / "Skip"
3. "FMU generated. Send to simulation engine?"
4. "Opening INCA and EHANDBOOK connections…"

**Back Navigation:**
- "Back to Calibration Agent" → `2_Calibration_Agent`
- "Back to Welcome" → `1_Welcome_Agent`

**Animation Placeholder:** `ANIMATION_VIRTUAL_CAL_FLOW` (960×540)
- Future: Replace with FMU build process visualization

---

### 2.3_Data_Logging_Orchestrator
**Conversation Flow:**
1. "Connect to customer cloud and pull fleet data?"
2. "Yes" / "No"
3. "Retrieving data and parsing for EATB report…"
4. "Report ready. Open EATB dashboard?"
5. "Open Dashboard" / "Close Session"

**Back Navigation:**
- "Back to Calibration Agent" → `2_Calibration_Agent`
- "Back to Welcome" → `1_Welcome_Agent`

**Animation Placeholder:** `ANIMATION_DATA_LOGGING_FLOW` (960×540)
- Future: Replace with fleet data analysis visualization

---

### 3_SWDev_Agent
**Routes:**
- "Access AURA AI for SW Development Support" → `3.1_AURA_Orchestrator`
- "Build SW using RTA-CAR Start-Kit" → `RTA-CAR_Cloud_Starter` (placeholder)

**Back Navigation:**
- "Back to Welcome" → `1_Welcome_Agent`

---

### 3.1_AURA_Orchestrator
**Conversation Flow:**
1. "Analyze new customer requirement?"
2. "Yes, analyze" / "No, skip"
3. "Performing diff analysis"
4. "Generating BSW configuration" (shows code block)
5. "Impact report ready. Open it?"
6. "Open Impact Report" / "Close Session"

**Flow Diagram Animation:** `ANIMATION_AURA_FLOW`
- Req Analysis → Req Diff → Req2Code → Req2Config → ISOLAR Tool → BSW Gen
- Progressive state highlighting as workflow advances

**Back Navigation:**
- "Back to SW Dev Agent" → `3_SWDev_Agent`
- "Back to Welcome" → `1_Welcome_Agent`

**PDF References:** p.26-28 (AURA requirement analysis workflow)

---

### External_Landing_Page
Placeholder for Azure Marketplace external link.
- Link to: https://azuremarketplace.microsoft.com/en-us/marketplace/apps/etas.etas-partnership
- "Back to Welcome" → `1_Welcome_Agent`

---

### RTA-CAR_Cloud_Starter
Placeholder for RTA-CAR cloud environment.
- "Back to SW Dev Agent" → `3_SWDev_Agent`
- "Back to Welcome" → `1_Welcome_Agent`

---

## Transition Specs

**Button → Frame:**
- Animation: Smart Animate
- Duration: 250ms
- Easing: ease-in-out

**Chat Bubble Reveals:**
- Animation: Dissolve
- Duration: 150ms
- Interaction: Button click triggers 'Change To' next state variant

---

## Animation Placeholder Labels

| Screen | Placeholder Label | Purpose | Future Content |
|--------|------------------|---------|----------------|
| Welcome | `ANIMATION_PLACEHOLDER_WELCOME` | Welcome screen visual | Brand animation |
| Calibration Agent | `ANIMATION_PLACEHOLDER_CALIBRATION` | Calibration overview | Process diagram |
| SW Dev Agent | `ANIMATION_PLACEHOLDER_SWDEV` | SW dev overview | Development flow |
| Cal Suite Orchestrator | `ANIMATION_CAL_SUITE_FLOW` | Torque model processing | ASCMO-AI workflow |
| Virtual Cal Orchestrator | `ANIMATION_VIRTUAL_CAL_FLOW` | FMU build process | VECU simulation |
| Data Logging Orchestrator | `ANIMATION_DATA_LOGGING_FLOW` | Fleet data analysis | EATB dashboard preview |
| AURA Orchestrator | `ANIMATION_AURA_FLOW` | Requirements workflow | Req-to-code pipeline |

All placeholders: 960×540px, label customizable via text property.

---

## Accessibility Notes

**Button States:**
- Default contrast ratio: ≥4.5:1 (WCAG AA compliant)
- Hover states maintain ETAS palette colors
- Focus ring: 2px solid #007BC2 (medium-blue-900)
- Focus ring offset: 2px

**Keyboard Navigation:**
- All interactive elements are keyboard accessible
- Tab order follows logical flow
- Enter/Space activates buttons

**Screen Reader Support:**
- Semantic HTML elements used throughout
- ARIA labels on icon-only buttons
- Proper heading hierarchy (h1 → h2 → h3)

---

## Component Library

Access via: Welcome screen → "View Component Library" link

**Contents:**
- Design Tokens (colors, typography)
- Button variants (primary, secondary, ghost) with all states
- Avatar system (Welcome, Calibration, SW Dev, AURA)
- Chat bubbles (agent/user variants, avatar/timestamp options)
- Cards (M: 640px, L: 960px)
- Metric cards (with delta indicators)
- Animation placeholders

**Typography System:**
- text-2xl-semibold: 32/40px, weight 600 (H1)
- text-xl-semibold: 24/32px, weight 600 (H2)
- text-l-semibold: 20/28px, weight 600 (H3)
- text-m-regular: 16/24px, weight 400 (Body)
- Fira Mono 14px: Code blocks

**Color System:**
- Primary: #164293 (etas-blue-900)
- Secondary: #89037A (purple-900)
- Gradient: #164293 → #89037A (left to right)
- Success: #039C7D
- Error: #E5004A
- Warning: #FCCD22
- Surface: #FAFAFA (surface-50)
- Text: #5A646E (gray-900)

---

## Global Components

**Header:**
- ETAS logo (left)
- Title (center)
- Gradient background (#164293 → #89037A, L→R)
- Height: 80px

**Footer:**
- Background: #F0F0F0 (darkened surface-100)
- Copyright: © 2025 ETAS Inc.
- Links: Privacy Policy, Terms of Service, Contact
- Border-top: 1px gray-200

---

## Development Notes

**State Management:**
- All screens use controlled component state
- Navigation handled via `onNavigate` callback
- Multi-step conversations track conversation step index

**Animations:**
- CSS transitions for button states
- Conditional rendering for conversation flow
- Timed state updates for "connecting" animations (2-2.5s delays)

**Responsive Considerations:**
- Fixed container width: 1440px max
- Fixed screen height: 900px
- Animation placeholders: 960×540px
- Cards: M=640px, L=960px

**Code Standards:**
- TypeScript strict mode
- Proper prop typing
- Accessibility attributes
- Semantic HTML


