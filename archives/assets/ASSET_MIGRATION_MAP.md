# Asset Migration Map

This document maps the old Figma asset paths to the new local asset paths.

## Migration Summary

All graphics have been moved from `figma:asset/*` imports to local files in the `/assets` folder.

## Path Mapping

| Old Path (Figma Asset) | New Path (Local) | Component |
|------------------------|------------------|-----------|
| `figma:asset/ffd53de85c2ccab1755ccff4cff38502fadfd03c.png` | `../assets/azure-logo.png` | `etas-header.tsx` |
| `figma:asset/a3b7b7a907bca4120bc1af0a2e74df5c5c93edf0.png` | `../assets/torque-model.png` | `calibration-suite-orchestrator.tsx` |
| `figma:asset/434a2166cde6a7709b9359ef145bb9ce6cd372f2.png` | `../assets/data-operator.png` | `data-operator-animation.tsx` |
| `figma:asset/c180ff7dc52b60f74296a965f8bd93186ac6f04a.png` | `../assets/eatb-tool.png` | `eatb-tool-animation.tsx` |
| `figma:asset/ee0ede3c776daf33e6affb8ccf854dcb1f085847.png` | `../assets/ascmo.png` | `ascmo-connection-animation.tsx` |
| `figma:asset/8f1ed853c4806e4481f5f1d5d10aa810cf0524e0.png` | `../assets/eatb-report-1.png` | `eatb-report-viewer.tsx` |
| `figma:asset/9a589cd3ed9e1dd07ce6dd7e37fef654628f666f.png` | `../assets/eatb-report-2.png` | `eatb-report-viewer.tsx` |
| `figma:asset/8c92e4aa65f7efeea8e7a8a1ae788bc8a586e6ee.png` | `../assets/final-report-1.png` | `final-eatb-report-viewer.tsx` |
| `figma:asset/0ab6ebe8b4d736b50ab604b43cb5802a65ec114d.png` | `../assets/final-report-2.png` | `final-eatb-report-viewer.tsx` |

## Component Import Changes

### components/etas-header.tsx
```typescript
// OLD
import azureLogo from 'figma:asset/ffd53de85c2ccab1755ccff4cff38502fadfd03c.png';

// NEW
import azureLogo from '../assets/azure-logo.png';
```

### components/calibration-suite-orchestrator.tsx
```typescript
// OLD
import torqueModelImage from 'figma:asset/a3b7b7a907bca4120bc1af0a2e74df5c5c93edf0.png';

// NEW
import torqueModelImage from '../assets/torque-model.png';
```

### components/data-operator-animation.tsx
```typescript
// OLD
import dataOperatorImage from 'figma:asset/434a2166cde6a7709b9359ef145bb9ce6cd372f2.png';

// NEW
import dataOperatorImage from '../assets/data-operator.png';
```

### components/eatb-tool-animation.tsx
```typescript
// OLD
import eatbToolImage from 'figma:asset/c180ff7dc52b60f74296a965f8bd93186ac6f04a.png';

// NEW
import eatbToolImage from '../assets/eatb-tool.png';
```

### components/ascmo-connection-animation.tsx
```typescript
// OLD
import ascmoImage from 'figma:asset/ee0ede3c776daf33e6affb8ccf854dcb1f085847.png';

// NEW
import ascmoImage from '../assets/ascmo.png';
```

### components/eatb-report-viewer.tsx
```typescript
// OLD
import eatbReport1 from 'figma:asset/8f1ed853c4806e4481f5f1d5d10aa810cf0524e0.png';
import eatbReport2 from 'figma:asset/9a589cd3ed9e1dd07ce6dd7e37fef654628f666f.png';

// NEW
import eatbReport1 from '../assets/eatb-report-1.png';
import eatbReport2 from '../assets/eatb-report-2.png';
```

### components/final-eatb-report-viewer.tsx
```typescript
// OLD
import finalReport1 from 'figma:asset/8c92e4aa65f7efeea8e7a8a1ae788bc8a586e6ee.png';
import finalReport2 from 'figma:asset/0ab6ebe8b4d736b50ab604b43cb5802a65ec114d.png';

// NEW
import finalReport1 from '../assets/final-report-1.png';
import finalReport2 from '../assets/final-report-2.png';
```

## Status

✅ All component imports have been updated
✅ Asset folder structure created
⏳ Awaiting export of actual image files from Figma

## Next Steps

1. Export the 9 images from Figma using the hashes provided
2. Rename them according to the "New Path" column
3. Place them in the `/assets` folder
4. Verify the application displays all images correctly
