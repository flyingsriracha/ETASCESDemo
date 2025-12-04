# How to Convert EATB Reports to Standalone (No Drag-and-Drop)

## Quick Start

### Method 1: Auto-detect (Easiest!)
Just point to the directory containing your report:

```bash
python3 convert_eatb_report.py /path/to/report/directory/
```

The script will automatically find the HTML file and data folder.

### Method 2: Specify files explicitly
```bash
python3 convert_eatb_report.py report.html data_folder/
```

## Examples

### Example 1: Your latest report (just converted!)
```bash
python3 convert_eatb_report.py "/Users/chj1ana/Documents/AI/CESDemoSite/evaluationResult_Torque_Demo_afterOpt/evaluationResult_2025-09-22_09-33-37"
```

**Result:** Created `2025-09-22_09-33-37_EATB Demo_internal_standalone.html` (64 MB)

### Example 2: EATB_results report
```bash
python3 convert_eatb_report.py EATB_results.html EATB_results/
```

### Example 3: EATB_preOpt report
```bash
python3 convert_eatb_report.py EATB_preOpt.html EATB_preOpt/
```

## What It Does

1. ✅ Reads your HTML file
2. ✅ Loads all JSON files from the data folder (61 files in your case!)
3. ✅ Embeds them as base64 in the HTML
4. ✅ Patches fetch() and XMLHttpRequest to use embedded data
5. ✅ Creates a standalone HTML file

## Output

The script creates a file named `*_standalone.html` in the same directory as the original HTML file.

**Example:**
- Input: `report.html` + `report_data/`
- Output: `report_standalone.html`

## File Sizes

The standalone file will be larger because it includes all the data:
- Small reports: ~12-15 MB
- Large reports: ~60-70 MB (like your latest one with 61 JSON files)

## How to Verify It Works

1. Open the standalone HTML file in your browser
2. Press F12 to open the browser console
3. Look for these messages:
   ```
   ✓ Loaded embedded data for files: [...]
   ✓ EATB data loader initialized successfully
   ✓ Using embedded data for: evaluationHash.json
   ✓ Using embedded data for: evaluationResults.json
   ```

If you see these messages, it's working! 🎉

## Troubleshooting

### "Could not auto-detect files"
The directory should contain:
- Exactly 1 HTML file
- Exactly 1 data folder

If you have multiple files, use Method 2 to specify them explicitly.

### "No JSON files found"
Make sure the data folder contains `.json` files.

### File won't open
- Try a different browser (Chrome/Firefox work best)
- Check the browser console (F12) for errors
- Make sure JavaScript is enabled

## Browser Support

✅ Chrome/Edge (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
❌ Internet Explorer (not supported)

## For Future Reports

Every time you get a new EATB report:

1. Copy `convert_eatb_report.py` to your reports directory (or keep it somewhere handy)
2. Run: `python3 convert_eatb_report.py /path/to/new/report/`
3. Open the `*_standalone.html` file

## Script Location

Keep `convert_eatb_report.py` in a convenient location, such as:
- Your Documents folder
- Your Desktop
- A dedicated "scripts" folder

You can run it from anywhere by providing the full path to your report.

## Summary of Your Converted Reports

1. ✅ `EATB_results_standalone.html` (12 MB)
2. ✅ `EATB_preOpt_standalone.html` (12.24 MB)
3. ✅ `2025-09-22_09-33-37_EATB Demo_internal_standalone.html` (64 MB)

All ready to use without drag-and-drop! 🎉
