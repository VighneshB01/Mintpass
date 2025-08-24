const fs = require('fs');

console.log('🔧 Quick Fix: Creating .env file...');

const envContent = `# Blockchain Configuration
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

try {
  fs.writeFileSync('.env', envContent);
  console.log('✅ .env file created successfully!');
  console.log('📋 Now you can deploy contracts: npx hardhat run scripts/deploy.js --network mumbai');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
}
