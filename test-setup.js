// Test script to verify API key setup
require('dotenv').config();

console.log('🧪 Testing API Key Setup...\n');

// Test Firebase Config
console.log('🔥 Firebase Configuration:');
console.log('✓ API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : '❌ Missing');
console.log('✓ Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : '❌ Missing');
console.log('✓ Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : '❌ Missing');

// Test Pinata Config
console.log('\n📌 Pinata Configuration:');
console.log('✓ API Key:', process.env.PINATA_API_KEY ? 'Set' : '❌ Missing');
console.log('✓ Secret Key:', process.env.PINATA_SECRET_KEY ? 'Set' : '❌ Missing');

// Test Blockchain Config
console.log('\n🔗 Blockchain Configuration:');
console.log('✓ Private Key:', process.env.PRIVATE_KEY ? 'Set' : '❌ Missing');
console.log('✓ Mumbai RPC:', process.env.MUMBAI_RPC_URL ? 'Set' : '❌ Missing');

console.log('\n📋 Next Steps:');
console.log('1. Replace demo values in frontend/.env.local with your Firebase config');
console.log('2. Replace demo values with your Pinata API keys');
console.log('3. Add your wallet private key to .env');
console.log('4. Run: npm run test-setup');