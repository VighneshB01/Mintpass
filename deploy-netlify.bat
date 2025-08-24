@echo off
echo 🚀 Preparing NFT Ticketing System for Netlify Deployment...
echo.

echo 📋 Building the frontend...
cd frontend
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed! Please check for errors.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo.
echo 📁 Build output is in: frontend/out/
echo.
echo 🌐 Next steps for Netlify deployment:
echo 1. Go to https://app.netlify.com/
echo 2. Click "Add new site" → "Deploy manually"
echo 3. Drag and drop the "frontend/out" folder
echo 4. Your site will be deployed automatically!
echo.
echo 🔧 Environment variables to add in Netlify:
echo NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDGcAmEZTzyEHKk3ORbMYN3JDrHuBOIi9c
echo NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=blockchain-d97f1.firebaseapp.com
echo NEXT_PUBLIC_FIREBASE_PROJECT_ID=blockchain-d97f1
echo NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=blockchain-d97f1.firebasestorage.app
echo NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=105566085232
echo NEXT_PUBLIC_FIREBASE_APP_ID=1:105566085232:web:065570b9f3a117edbb54b5
echo NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com
echo.
echo 🎉 Your NFT Ticketing System is ready for deployment!
pause
