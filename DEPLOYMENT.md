# Deployment Guide

Complete deployment guide for the Dynamic NFT Ticketing System.

## 📋 Prerequisites

- Node.js 18+ installed
- MetaMask wallet with MATIC tokens
- Firebase account
- Pinata IPFS account
- Polygonscan API key (optional, for verification)

## 🔧 Environment Setup

### 1. Root Environment (.env)
```bash
cp .env.example .env
```

Edit `.env` with:
```env
# Blockchain Configuration
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
```

### 2. Frontend Environment
```bash
cp frontend/.env.local.example frontend/.env.local
```

Edit `frontend/.env.local` with Firebase and contract details.

## 🚀 Deployment Steps

### Step 1: Install Dependencies
```bash
# Root dependencies
npm install

# Frontend dependencies
cd frontend && npm install && cd ..

# Backend dependencies
cd backend && npm install && cd ..
```

### Step 2: Deploy Smart Contracts
```bash
# Compile contracts
npx hardhat compile

# Deploy to Mumbai testnet
npx hardhat run scripts/deploy.js --network mumbai

# Verify contracts (optional)
npx hardhat verify --network mumbai DEPLOYED_CONTRACT_ADDRESS
```

**Note**: Save the deployed contract addresses from the output.

### Step 3: Update Contract Addresses
Update `frontend/.env.local` with deployed contract addresses:
```env
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_LOYALTY_TOKEN_ADDRESS=0x...
```

### Step 4: Setup Firebase

#### Initialize Firebase Project
```bash
cd backend
firebase login
firebase init
```

Select:
- Functions: Configure and deploy Cloud Functions
- Firestore: Configure security rules and indexes
- Hosting: Configure files for Firebase Hosting

#### Configure Firebase Functions
```bash
# Set blockchain configuration
firebase functions:config:set blockchain.rpc_url="https://rpc-mumbai.maticvigil.com"
firebase functions:config:set contracts.nft_address="DEPLOYED_NFT_ADDRESS"
firebase functions:config:set contracts.loyalty_address="DEPLOYED_LOYALTY_ADDRESS"
```

#### Deploy Firebase
```bash
firebase deploy
```

### Step 5: Setup IPFS (Pinata)

1. Create account at [Pinata](https://pinata.cloud)
2. Generate API keys
3. Add keys to environment files

### Step 6: Deploy Frontend

#### Option A: Vercel (Recommended)
```bash
cd frontend
npm install -g vercel
vercel
```

#### Option B: Firebase Hosting
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

#### Option C: Local Development
```bash
cd frontend
npm run dev
```

## 🔍 Verification

### 1. Smart Contracts
- Check contracts on [Mumbai Polygonscan](https://mumbai.polygonscan.com)
- Verify contract source code
- Test basic functions

### 2. Backend Functions
- Test API endpoints
- Check Firebase console for logs
- Verify Firestore collections

### 3. Frontend Application
- Test user authentication
- Test wallet connection
- Test ticket minting
- Test QR code generation/scanning

## 🛠️ Post-Deployment Setup

### 1. Contract Permissions
```bash
# Add authorized scanners (if needed)
npx hardhat console --network mumbai
```

```javascript
const contract = await ethers.getContractAt("DynamicNFTTicket", "CONTRACT_ADDRESS");
await contract.addAuthorizedScanner("SCANNER_ADDRESS");
```

### 2. Firebase Security
- Review Firestore security rules
- Set up authentication providers
- Configure CORS settings

### 3. Frontend Configuration
- Update contract ABIs if needed
- Configure wallet networks
- Test all user flows

## 📊 Monitoring

### Smart Contracts
- Monitor gas usage
- Track transaction success rates
- Watch for failed transactions

### Backend Functions
- Monitor function execution times
- Check error rates
- Review database performance

### Frontend
- Monitor user engagement
- Track wallet connection rates
- Monitor API call success rates

## 🔧 Troubleshooting

### Common Issues

#### Contract Deployment Fails
- Check wallet balance (need MATIC for gas)
- Verify network configuration
- Check RPC URL connectivity

#### Frontend Can't Connect to Contracts
- Verify contract addresses in .env.local
- Check network ID matches
- Ensure MetaMask is on correct network

#### Firebase Functions Timeout
- Check function memory allocation
- Verify external API connectivity
- Review function logs

#### IPFS Upload Fails
- Verify Pinata API keys
- Check file size limits
- Test API connectivity

### Debug Commands
```bash
# Check contract deployment
npx hardhat verify --network mumbai CONTRACT_ADDRESS

# Test Firebase functions locally
cd backend && npm run serve

# Check frontend build
cd frontend && npm run build

# View Firebase logs
firebase functions:log
```

## 🔄 Updates and Maintenance

### Smart Contract Updates
- Deploy new versions with migration scripts
- Update frontend contract addresses
- Notify users of changes

### Backend Updates
```bash
cd backend
firebase deploy --only functions
```

### Frontend Updates
```bash
cd frontend
npm run build
# Deploy to your hosting platform
```

## 📈 Scaling Considerations

### Smart Contracts
- Consider gas optimization
- Implement batch operations
- Plan for contract upgrades

### Backend
- Monitor Firebase quotas
- Implement caching strategies
- Consider database sharding

### Frontend
- Implement code splitting
- Optimize bundle size
- Add performance monitoring

## 🔐 Security Checklist

- [ ] Private keys secured
- [ ] Firebase rules properly configured
- [ ] Contract permissions set correctly
- [ ] API keys not exposed in frontend
- [ ] HTTPS enabled for all endpoints
- [ ] Input validation implemented
- [ ] Rate limiting configured