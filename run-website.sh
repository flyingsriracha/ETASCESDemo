#!/bin/bash

# ETAS CES Demonstrator - Quick Start Script for Linux
# Run this script to start the development server

cd "$(dirname "$0")"

echo "========================================"
echo " ETAS CES Demonstrator"
echo " Starting Development Server..."
echo "========================================"
echo ""

echo "[1/2] Installing dependencies (if needed)..."
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to install dependencies"
    echo "Please check that Node.js and npm are installed correctly"
    exit 1
fi

echo ""
echo "[2/2] Starting development server..."
echo ""
echo "========================================"
echo " Server will open at: http://localhost:1580"
echo " Press Ctrl+C to stop the server"
echo "========================================"
echo ""

npm run dev





