@echo off
echo 🚀 Pushing NFT Ticketing System to GitHub...
echo.

echo 📋 Step 1: Setting up GitHub repository...
node setup-github.js

echo.
echo 📋 Step 2: Initializing Git repository...
git init

echo.
echo 📋 Step 3: Adding all files to Git...
git add .

echo.
echo 📋 Step 4: Making initial commit...
git commit -m "Initial commit: NFT Ticketing System with dynamic states and QR validation"

echo.
echo 🎉 Git repository initialized successfully!
echo.
echo 📋 Next steps:
echo 1. Go to https://github.com/new
echo 2. Create a new repository (e.g., "nft-ticketing-system")
echo 3. Copy the repository URL
echo 4. Run the following commands:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 📋 After pushing to GitHub:
echo 1. Go to https://app.netlify.com/
echo 2. Click "Add new site" → "Import an existing project"
echo 3. Connect to GitHub and select your repository
echo 4. Set build settings:
echo    - Build command: cd frontend && npm run build
echo    - Publish directory: frontend/out
echo 5. Add environment variables in Netlify dashboard
echo.
echo 🎫 Your NFT Ticketing System will be live on Netlify!
pause
