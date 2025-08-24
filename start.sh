#!/bin/bash

echo "🎫 Starting Dynamic NFT Ticketing System..."
echo

echo "📋 Checking dependencies..."
if ! command -v npm &> /dev/null; then
    echo "❌ Node.js/npm not found. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js/npm found"
echo

echo "🔧 Installing dependencies (if needed)..."
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

echo
echo "🚀 Starting frontend development server..."
echo "📱 Open http://localhost:3000 in your browser"
echo
echo "Press Ctrl+C to stop the server"
echo

cd frontend
npm run dev