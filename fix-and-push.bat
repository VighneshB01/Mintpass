@echo off
echo 🔧 Fixing Netlify build and pushing to GitHub...
echo.

echo 📋 Step 1: Running Netlify build fixes...
node fix-netlify-build.js

echo.
echo 📋 Step 2: Adding all changes to Git...
git add .

echo.
echo 📋 Step 3: Committing changes...
git commit -m "Fix Netlify build: Update package.json and build configuration"

echo.
echo 📋 Step 4: Pushing to GitHub...
git push origin main

echo.
echo 🎉 Successfully pushed fixes to GitHub!
echo.
echo 📋 Netlify will automatically rebuild with the fixes.
echo 📋 Check your Netlify dashboard for the new deployment.
echo.
pause
