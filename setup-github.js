const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up GitHub repository for NFT Ticketing System...\n');

// Create a comprehensive README for GitHub
const readmeContent = `# 🎫 NFT Ticketing System

A blockchain-based event ticketing system using ERC-721 NFTs that evolve from "Unused" → "Attended" → "Rewarded" states.

## 🌟 Features

- ✅ **Dynamic NFT Tickets** - Tickets change state based on usage
- ✅ **QR Code Integration** - Generate and scan QR codes for validation
- ✅ **Loyalty Token System** - Reward attendees with ERC-20 tokens
- ✅ **Event Organizer Dashboard** - Mint and manage tickets
- ✅ **Real-time Updates** - Live ticket state changes
- ✅ **Mobile Responsive** - Works on all devices

## 🏗️ Architecture

- **Frontend**: Next.js 14 + React + Tailwind CSS
- **Backend**: Express.js API server
- **Blockchain**: Solidity smart contracts on Polygon Mumbai
- **Authentication**: Firebase Auth
- **Storage**: IPFS for metadata

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask wallet with MATIC tokens
- Firebase project

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/nft-ticketing-system.git
   cd nft-ticketing-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   \`\`\`

3. **Set up environment variables**
   - Copy \`.env.example\` to \`.env\`
   - Add your Firebase configuration
   - Add your wallet private key

4. **Deploy smart contracts**
   \`\`\`bash
   npx hardhat run scripts/deploy.js --network mumbai
   \`\`\`

5. **Start the application**
   \`\`\`bash
   # Start backend API
   cd backend && npm start
   
   # Start frontend (in another terminal)
   cd frontend && npm run dev
   \`\`\`

## 📱 Usage

1. **Connect Wallet** - Connect MetaMask to Mumbai testnet
2. **Mint Tickets** - Use the organizer panel to create NFT tickets
3. **Scan QR Codes** - Validate tickets at events
4. **Earn Rewards** - Receive loyalty tokens for attendance

## 🔧 Smart Contracts

### DynamicNFTTicket.sol
- ERC-721 NFT with dynamic states
- QR code integration
- Authorized scanner system

### LoyaltyToken.sol
- ERC-20 reward token
- Attendance-based rewards
- Early bird bonuses

## 🌐 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: \`cd frontend && npm run build\`
3. Set publish directory: \`frontend/out\`
4. Add environment variables in Netlify dashboard

### Environment Variables
\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_deployed_nft_address
NEXT_PUBLIC_LOYALTY_TOKEN_ADDRESS=your_deployed_loyalty_address
\`\`\`

## 📁 Project Structure

\`\`\`
├── contracts/          # Solidity smart contracts
├── frontend/           # Next.js React application
├── backend/            # Express.js API server
├── scripts/            # Deployment and utility scripts
└── docs/              # Documentation
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting guide
2. Open an issue on GitHub
3. Review the documentation

---

**Built with ❤️ for the Web3 community**
`;

// Create environment example file
const envExampleContent = `# Blockchain Configuration
PRIVATE_KEY=your_wallet_private_key_here
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGON_RPC_URL=https://polygon-rpc.com
POLYGONSCAN_API_KEY=your_polygonscan_api_key

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# IPFS Configuration
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
`;

// Create frontend environment example
const frontendEnvExampleContent = `# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Blockchain Configuration
NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_deployed_nft_address
NEXT_PUBLIC_LOYALTY_TOKEN_ADDRESS=your_deployed_loyalty_address

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001

# IPFS Configuration
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
`;

try {
  // Update README
  fs.writeFileSync('README.md', readmeContent);
  console.log('✅ Updated README.md');

  // Create environment example files
  fs.writeFileSync('.env.example', envExampleContent);
  console.log('✅ Created .env.example');

  const frontendEnvPath = path.join('frontend', '.env.local.example');
  fs.writeFileSync(frontendEnvPath, frontendEnvExampleContent);
  console.log('✅ Created frontend/.env.local.example');

  console.log('\n🎉 GitHub setup completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Initialize git: git init');
  console.log('2. Add files: git add .');
  console.log('3. Commit: git commit -m "Initial commit"');
  console.log('4. Create GitHub repository');
  console.log('5. Push: git remote add origin https://github.com/yourusername/repo-name.git');
  console.log('6. Push: git push -u origin main');

} catch (error) {
  console.error('❌ Error setting up GitHub:', error.message);
}
