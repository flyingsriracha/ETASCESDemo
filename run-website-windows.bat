@echo off
REM ETAS CES Demonstrator - Quick Start Script for Windows
REM Double-click this file to start the development server

cd /d "%~dp0"

echo.
echo ========================================
echo  ETAS CES Demonstrator
echo  Starting Development Server...
echo ========================================
echo.

echo [1/2] Installing dependencies (if needed)...
call npm install
if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies
    echo Please check that Node.js and npm are installed correctly
    pause
    exit /b 1
)

echo.
echo [2/2] Starting development server...
echo.
echo ========================================
echo  Server will open at: http://localhost:1580
echo  Press Ctrl+C to stop the server
echo ========================================
echo.

call npm run dev

pause





