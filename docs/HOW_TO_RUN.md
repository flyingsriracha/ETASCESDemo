# 🚀 How to Run ETAS CES Demonstrator

## For Users with Zero Technical Knowledge

### ✅ Easiest Way (macOS)

**Just double-click this file:**
```
run-website.command
```

That's it! The script will:
- ✅ Check everything automatically
- ✅ Install missing dependencies
- ✅ Start the website
- ✅ Open your browser automatically
- ✅ Show clear status messages

**Keep the terminal window open** while using the website.

---

## 📋 What the Script Does Automatically

### 1. **Pre-Flight Checks**
- ✅ Verifies Node.js is installed (version 18+)
- ✅ Verifies npm is installed
- ✅ Checks disk space
- ✅ Checks if port 1580 is available
- ✅ Verifies project files exist

### 2. **Dependency Management**
- ✅ Checks if dependencies are installed
- ✅ Automatically installs if missing
- ✅ Retries up to 3 times if installation fails
- ✅ Shows clear progress messages

### 3. **Port Management**
- ✅ Automatically frees port 1580 if in use
- ✅ Gracefully closes conflicting processes
- ✅ Shows which port is being used

### 4. **Server Startup**
- ✅ Starts the development server
- ✅ Waits for server to be ready (up to 30 seconds)
- ✅ Verifies server is responding
- ✅ Shows server status and URL

### 5. **Error Handling**
- ✅ Clear error messages with solutions
- ✅ Automatic retry on failures
- ✅ Logs all actions to `startup.log`
- ✅ Graceful cleanup on exit

---

## 🎯 Step-by-Step Guide

### Option 1: Double-Click (macOS)

1. **Find the file** `run-website.command` in Finder
2. **Double-click** it
3. **Wait** for the checks to complete
4. **Browser opens automatically** to http://localhost:1580
5. **Done!** Use the website

### Option 2: Terminal (All Platforms)

1. **Open Terminal** (or Command Prompt on Windows)
2. **Navigate** to the project folder:
   ```bash
   cd /path/to/CESDemoSite
   ```
3. **Run** the script:
   ```bash
   ./run-website.sh
   ```
4. **Wait** for startup
5. **Open browser** to http://localhost:1580

---

## 🛑 How to Stop the Server

**Press:** `Ctrl + C` in the terminal window

The script will automatically:
- ✅ Stop the server gracefully
- ✅ Clean up processes
- ✅ Free the port

---

## ❓ Troubleshooting

### Problem: "Node.js is not installed"

**Solution:**
1. Visit https://nodejs.org/
2. Download Node.js (LTS version)
3. Install it
4. Restart your terminal
5. Try again

### Problem: "Port 1580 is in use"

**Solution:**
The script tries to fix this automatically. If it fails:
1. Close any other applications using port 1580
2. Or restart your computer
3. Try running the script again

### Problem: "Dependencies failed to install"

**Solution:**
1. Check your internet connection
2. Try running:
   ```bash
   npm cache clean --force
   ```
3. Delete the `node_modules` folder
4. Run the script again

### Problem: "Server didn't start"

**Solution:**
1. Check the log file: `startup.log`
2. Look for error messages
3. Common issues:
   - Port conflict
   - Missing dependencies
   - Configuration error

---

## 📊 What You'll See

### Success Output:
```
╔════════════════════════════════════════════════════════╗
║  ETAS CES Demonstrator - Startup Script               ║
║  Version 2.0 - Robust & User-Friendly                 ║
╚════════════════════════════════════════════════════════╝

[✓] Node.js v18.17.0 detected
[✓] npm v9.6.7 detected
[✓] Port 1580 is available
[✓] Dependencies are installed
[✓] Server process started (PID: 12345)
[✓] Server is responding!

╔════════════════════════════════════════════════════════╗
║  ✅ Website is running successfully!                   ║
╚════════════════════════════════════════════════════════╝

Website URL: http://localhost:1580
Server PID: 12345
Log File: startup.log

⚠ Keep this window open while using the website
⚠ Press Ctrl+C to stop the server
```

---

## 🔍 Advanced Features

### Log File
All actions are logged to: `startup.log`

### Manual Commands
If you prefer manual control:

```bash
# Install dependencies
npm install

# Start server
npm run dev

# Stop server
Press Ctrl+C
```

### Check Server Status
```bash
# Check if server is running
curl http://localhost:1580

# Check what's using port 1580
lsof -i :1580
```

---

## 💡 Tips

1. **Keep terminal open** - Closing it stops the website
2. **Check logs** - If something goes wrong, check `startup.log`
3. **One instance** - Don't run multiple instances at once
4. **Internet required** - For first-time dependency installation
5. **Be patient** - First startup may take longer (installing dependencies)

---

## 🎉 That's It!

The script is designed to be **completely automatic**. Just double-click and go!

If you encounter any issues:
1. Check the error message
2. Look at `startup.log`
3. Try the troubleshooting steps above
4. Restart your computer if needed

**Happy demoing! 🚀**


