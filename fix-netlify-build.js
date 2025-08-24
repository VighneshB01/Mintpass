const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Netlify build issues...\n');

// Update the root package.json to include a build script
const rootPackageJson = {
  "name": "nft-ticketing-system",
  "version": "1.0.0",
  "description": "Blockchain-based NFT ticketing system with dynamic states",
  "main": "index.js",
  "scripts": {
    "build": "cd frontend && npm install && npm run build",
    "dev": "concurrently \"cd backend && npm start\" \"cd frontend && npm run dev\"",
    "install-all": "npm install && cd frontend && npm install && cd ../backend && npm install",
    "deploy": "cd frontend && npm run build",
    "test": "echo \"No tests specified\" && exit 0"
  },
  "keywords": ["nft", "blockchain", "ticketing", "polygon", "solidity"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
};

// Update frontend package.json to ensure all dependencies are correct
const frontendPackageJson = {
  "name": "nft-ticketing-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && next export"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "ethers": "^6.8.0",
    "firebase": "^10.5.0",
    "qrcode": "^1.5.3",
    "qr-scanner": "^1.4.2",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "react-hot-toast": "^2.4.1"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
};

// Create a Netlify build script
const netlifyBuildScript = `#!/bin/bash
echo "🔧 Installing dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🏗️ Building frontend..."
npm run build

echo "✅ Build completed successfully!"
`;

// Update netlify.toml with better configuration
const netlifyToml = `[build]
  command = "npm run build"
  publish = "frontend/out"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[context.production.environment]
  NODE_ENV = "production"

[context.deploy-preview.environment]
  NODE_ENV = "development"
`;

try {
  // Update root package.json
  fs.writeFileSync('package.json', JSON.stringify(rootPackageJson, null, 2));
  console.log('✅ Updated root package.json');

  // Update frontend package.json
  fs.writeFileSync('frontend/package.json', JSON.stringify(frontendPackageJson, null, 2));
  console.log('✅ Updated frontend package.json');

  // Create Netlify build script
  fs.writeFileSync('netlify-build.sh', netlifyBuildScript);
  console.log('✅ Created netlify-build.sh');

  // Update netlify.toml
  fs.writeFileSync('netlify.toml', netlifyToml);
  console.log('✅ Updated netlify.toml');

  // Create a .nvmrc file for Node version
  fs.writeFileSync('.nvmrc', '18');
  console.log('✅ Created .nvmrc');

  // Create a .node-version file for Netlify
  fs.writeFileSync('.node-version', '18');
  console.log('✅ Created .node-version');

  console.log('\n🎉 Netlify build fixes completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Commit these changes: git add . && git commit -m "Fix Netlify build"');
  console.log('2. Push to GitHub: git push origin main');
  console.log('3. Netlify will automatically rebuild with the fixes');

} catch (error) {
  console.error('❌ Error fixing Netlify build:', error.message);
}
