@echo off
echo 🔧 Fixing all issues and deploying NFT Ticketing System...
echo.

echo 📋 Step 1: Creating environment files...
node fix-all-issues.js

echo.
echo 📋 Step 2: Installing dependencies...
call npm install

echo.
echo 📋 Step 3: Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo 📋 Step 4: Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo 📋 Step 5: Compiling smart contracts...
call npx hardhat compile

echo.
echo 📋 Step 6: Deploying smart contracts to Mumbai...
call npx hardhat run scripts/deploy.js --network mumbai

echo.
echo 📋 Step 7: Starting the application...
echo.
echo 🚀 Starting both servers...
start "Backend API" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo 🎉 NFT Ticketing System is now running!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔗 Backend API: http://localhost:5001
echo.
echo Press any key to open the frontend...
pause >nul
start http://localhost:3000
