@echo off
echo 🎫 Starting NFT Ticketing System (Local Development)...
echo.

echo 📋 Starting Backend API Server...
start "Backend API" cmd /k "cd backend && npm start"

echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo 🌐 Starting Frontend Development Server...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo 🚀 Both servers are starting...
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔗 Backend API: http://localhost:5001
echo 📋 Health Check: http://localhost:5001/health
echo.
echo Press any key to open the frontend in your browser...
pause >nul
start http://localhost:3000
