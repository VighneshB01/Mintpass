@echo off
echo 🎫 Starting Dynamic NFT Ticketing System...
echo.

echo 📋 Checking dependencies...
call npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js/npm not found. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js/npm found
echo.

echo 🔧 Installing dependencies (if needed)...
if not exist "node_modules" (
    echo Installing root dependencies...
    call npm install
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

echo.
echo 🚀 Starting frontend development server...
echo 📱 Open http://localhost:3000 in your browser
echo.
echo Press Ctrl+C to stop the server
echo.

cd frontend
call npm run dev