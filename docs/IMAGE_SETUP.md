# Image Setup Instructions

The torque model images need to be copied to the `public/assets/images/` directory.

## Quick Fix

Run this command in your terminal:

```bash
npm run copy-images
```

Or manually copy the files:

```bash
cp TorqueAscmo.png public/assets/images/
cp TorqueModel_opt.jpg public/assets/images/
```

## Verify

After copying, you should see these files in `public/assets/images/`:
- `TorqueAscmo.png`
- `TorqueModel_opt.jpg`

The images will then be accessible at:
- `/assets/images/TorqueAscmo.png`
- `/assets/images/TorqueModel_opt.jpg`

## Troubleshooting

If images still don't show:
1. Make sure the files were copied successfully
2. Restart the dev server (`npm run dev`)
3. Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)


