@echo off
echo 🔧 Quick Fix and Deploy - NFT Ticketing System
echo.

echo 📋 Step 1: Creating .env file...
node quick-fix.js

echo.
echo 📋 Step 2: Compiling contracts...
call npx hardhat compile

echo.
echo 📋 Step 3: Deploying contracts to Mumbai...
call npx hardhat run deploy-simple.js --network mumbai

echo.
echo 📋 Step 4: Creating frontend environment file...
if not exist "frontend\.env.local" (
    echo # Firebase Configuration > frontend\.env.local
    echo NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDGcAmEZTzyEHKk3ORbMYN3JDrHuBOIi9c >> frontend\.env.local
    echo NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=blockchain-d97f1.firebaseapp.com >> frontend\.env.local
    echo NEXT_PUBLIC_FIREBASE_PROJECT_ID=blockchain-d97f1 >> frontend\.env.local
    echo NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=blockchain-d97f1.firebasestorage.app >> frontend\.env.local
    echo NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=105566085232 >> frontend\.env.local
    echo NEXT_PUBLIC_FIREBASE_APP_ID=1:105566085232:web:065570b9f3a117edbb54b5 >> frontend\.env.local
    echo NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com >> frontend\.env.local
    echo NEXT_PUBLIC_API_URL=http://localhost:5001 >> frontend\.env.local
)

echo.
echo 🎉 Setup completed! Check deployment-addresses.json for contract addresses.
echo.
echo 📋 Next steps:
echo 1. Update contract addresses in frontend\.env.local
echo 2. Start the application: start-local.bat
echo.
pause
