# Asset Export Checklist

Use this checklist to ensure all graphics have been exported from Figma and placed in the `/assets` folder.

## Export Checklist

- [x] **ETAS_Logo_White.svg** - ETAS logo (header) ✅ **COMPLETED**
  - Source: Provided SVG file
  - Used in: `components/etas-header.tsx`
  - Display: White ETAS logo for header

- [x] **azure-logo.png** - Azure logo (header) ✅ **COMPLETED**
  - Source: Figma asset `ffd53de85c2ccab1755ccff4cff38502fadfd03c.png`
  - Used in: `components/etas-header.tsx`
  - Display: 40% bigger than ETAS logo in header

- [ ] **torque-model.png** - Torque model diagram
  - Source: Figma asset `a3b7b7a907bca4120bc1af0a2e74df5c5c93edf0.png`
  - Used in: `components/calibration-suite-orchestrator.tsx`
  - Display: Model visualization for FMU upload

- [ ] **data-operator.png** - Data operator interface
  - Source: Figma asset `434a2166cde6a7709b9359ef145bb9ce6cd372f2.png`
  - Used in: `components/data-operator-animation.tsx`
  - Display: Screenshot of data operator interface

- [ ] **eatb-tool.png** - EATB tool interface
  - Source: Figma asset `c180ff7dc52b60f74296a965f8bd93186ac6f04a.png`
  - Used in: `components/eatb-tool-animation.tsx`
  - Display: Screenshot of EATB tool

- [ ] **ascmo.png** - ASCMO neural network tool
  - Source: Figma asset `ee0ede3c776daf33e6affb8ccf854dcb1f085847.png`
  - Used in: `components/ascmo-connection-animation.tsx`
  - Display: ASCMO-AI tool interface

- [ ] **eatb-report-1.png** - First page of EATB report
  - Source: Figma asset `8f1ed853c4806e4481f5f1d5d10aa810cf0524e0.png`
  - Used in: `components/eatb-report-viewer.tsx`
  - Display: Pre-optimization report page 1

- [ ] **eatb-report-2.png** - Second page of EATB report
  - Source: Figma asset `9a589cd3ed9e1dd07ce6dd7e37fef654628f666f.png`
  - Used in: `components/eatb-report-viewer.tsx`
  - Display: Pre-optimization report page 2

- [ ] **final-report-1.png** - First page of final report
  - Source: Figma asset `8c92e4aa65f7efeea8e7a8a1ae788bc8a586e6ee.png`
  - Used in: `components/final-eatb-report-viewer.tsx`
  - Display: Post-optimization report page 1

- [ ] **final-report-2.png** - Second page of final report
  - Source: Figma asset `0ab6ebe8b4d736b50ab604b43cb5802a65ec114d.png`
  - Used in: `components/final-eatb-report-viewer.tsx`
  - Display: Post-optimization report page 2

## Quick Export Steps from Figma

1. Open your Figma file
2. For each asset hash listed above, search in Figma layers panel
3. Select the asset/frame
4. Export Settings:
   - Format: PNG
   - Scale: 2x (recommended for retina displays)
5. Save with the corresponding filename
6. Place in `/assets` folder

## Verification

After exporting all assets:
1. Ensure all 9 files are in the `/assets` folder
2. Check file names match exactly (case-sensitive)
3. Verify images display correctly in the app
4. Check file sizes are optimized for web (<500KB recommended)

## Notes

- All import statements have been updated to reference `/assets` folder
- The ETAS logo uses an external CDN URL (no export needed)
- All `figma:asset` imports have been replaced with local imports
