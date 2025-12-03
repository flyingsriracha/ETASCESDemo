# Assets Directory

This directory contains all graphics and images used in the ETAS CES Demonstrator application.

## Required Image Files

The following images need to be exported from your Figma design and placed in this directory:

1. **azure-logo.png** - Azure logo (used in header, 40% bigger than ETAS logo)
2. **torque-model.png** - Torque model visualization for FMU upload
3. **data-operator.png** - Data operator interface screenshot
4. **eatb-tool.png** - EATB tool interface screenshot
5. **ascmo.png** - ASCMO neural network optimization tool screenshot
6. **eatb-report-1.png** - First page of EATB report
7. **eatb-report-2.png** - Second page of EATB report
8. **final-report-1.png** - First page of final optimization report
9. **final-report-2.png** - Second page of final optimization report

## Figma Export Instructions

For each asset in your Figma file:
1. Select the asset/frame
2. Right-click > Export > PNG (2x for retina displays recommended)
3. Save with the corresponding filename from the list above
4. Place in the `/assets` directory

## Additional Notes

- The ETAS logo in the header uses an external CDN URL and doesn't need to be exported
- The ETAS logo component uses an embedded base64 image and doesn't need to be exported
- All images should be optimized for web (compressed without significant quality loss)
- Recommended resolution: Export at 2x for retina display support
