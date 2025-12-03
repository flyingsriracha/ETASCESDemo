# Font Setup Instructions

To complete the ETAS CI 2.0 design system integration, you need to copy the Manrope font files:

## Steps:

1. Create the fonts directory:
   ```bash
   mkdir -p public/fonts
   ```

2. Copy the font files:
   ```bash
   cp ui-bundle-etas-ci-2.0/font/manrope-latin-400-normal.woff public/fonts/
   cp ui-bundle-etas-ci-2.0/font/manrope-latin-600-normal.woff public/fonts/
   ```

Or run the provided script:
```bash
chmod +x copy-fonts.sh
./copy-fonts.sh
```

The fonts will be served from `/fonts/` and loaded via @font-face declarations in `src/styles/globals.css`.


