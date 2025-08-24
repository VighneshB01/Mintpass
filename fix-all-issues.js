const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing all issues in NFT Ticketing System...\n');

// Step 1: Create root .env file
const rootEnvContent = `# Blockchain Configuration
PRIVATE_KEY=4389bc6b0d36697de6e2d6f5d5f0b47511a0e85b5f4c21ac8daad5fd22b9fa49
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGON_RPC_URL=https://polygon-rpc.com
POLYGONSCAN_API_KEY=your_polygonscan_api_key

# Firebase Configuration
FIREBASE_PROJECT_ID=blockchain-d97f1
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# IPFS Configuration
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
`;

// Step 2: Create frontend .env.local file
const frontendEnvContent = `# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDGcAmEZTzyEHKk3ORbMYN3JDrHuBOIi9c
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=blockchain-d97f1.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=blockchain-d97f1
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=blockchain-d97f1.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=105566085232
NEXT_PUBLIC_FIREBASE_APP_ID=1:105566085232:web:065570b9f3a117edbb54b5

# Blockchain Configuration
NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_LOYALTY_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001

# IPFS Configuration
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
`;

// Step 3: Create backend .env file
const backendEnvContent = `# Server Configuration
PORT=5001

# Blockchain Configuration
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
NFT_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
LOYALTY_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000

# Firebase Configuration
FIREBASE_PROJECT_ID=blockchain-d97f1
`;

try {
  // Create root .env
  fs.writeFileSync('.env', rootEnvContent);
  console.log('✅ Created root .env file');

  // Create frontend .env.local
  const frontendEnvPath = path.join('frontend', '.env.local');
  fs.writeFileSync(frontendEnvPath, frontendEnvContent);
  console.log('✅ Created frontend .env.local file');

  // Create backend .env
  const backendEnvPath = path.join('backend', '.env');
  fs.writeFileSync(backendEnvPath, backendEnvContent);
  console.log('✅ Created backend .env file');

  // Create deployments directory if it doesn't exist
  if (!fs.existsSync('deployments')) {
    fs.mkdirSync('deployments');
    console.log('✅ Created deployments directory');
  }

  console.log('\n🎉 All environment files created successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Deploy smart contracts: npx hardhat run scripts/deploy.js --network mumbai');
  console.log('2. Update contract addresses in .env files');
  console.log('3. Start the application: npm run start-local');

} catch (error) {
  console.error('❌ Error creating files:', error.message);
}
