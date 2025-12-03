# 🚀 Start ETAS CES Demonstrator

## Quick Start - Click to Run!

### Option 1: Double-Click (Easiest - macOS)
**Just double-click this file:**
```
run-website.command
```
- The website will start automatically
- Your browser will open to http://localhost:1580
- **Keep the terminal window open** while using the website

### Option 2: Terminal Command
Open Terminal and run:
```bash
./run-website.sh
```

Or:
```bash
npm run dev
```

### Option 3: Manual Steps
1. Open Terminal
2. Navigate to this folder:
   ```bash
   cd /Users/chj1ana/Documents/AI/CESDemoSite
   ```
3. Run:
   ```bash
   npm run dev
   ```

## 🌐 Access the Website

Once started, open your browser to:
**http://localhost:1580**

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal window

## 🎨 Features Available

✅ **4 Agent Chat Circles** (bottom-left)
- 🤖 Welcome Agent
- 📊 Calibration Agent
- 💻 SW Dev Agent
- ✨ AURA AI Agent

✅ **Settings Panel** (⚙️ icon in header)
- Theme customization
- Application settings
- Layout preferences
- Import/Export configs

✅ **Component Library** (📚 icon at bottom-right)

## 🐛 Troubleshooting

### Port Already in Use
If you get a "port already in use" error:
```bash
# Kill the process using port 1580
lsof -ti:1580 | xargs kill -9
```

Then run the script again.

### Dependencies Not Installed
```bash
npm install
```

### Clear Cache & Restart
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📝 What the Script Does

1. ✅ Checks if dependencies are installed
2. ✅ Kills any existing server on port 1580
3. ✅ Starts the development server
4. ✅ Opens browser automatically (`.command` version)
5. ✅ Shows clear instructions

## 💡 Tips

- **Keep terminal open** - Closing it stops the website
- **Hot reload enabled** - Changes appear instantly
- **Press Ctrl+C** to stop the server cleanly
- **Check browser console** for any errors

---

**Ready?** Double-click `run-website.command` to start! 🎉



