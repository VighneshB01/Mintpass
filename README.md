# Dynamic NFT Ticketing System

A blockchain-based event ticketing system using ERC-721 NFTs that evolve from "Unused" → "Attended" → "Rewarded" states.

## 🏗️ Architecture

- **Frontend**: Next.js + React + Web3.js
- **Backend**: Firebase (Auth + Firestore + Functions)
- **Blockchain**: Solidity ERC-721 on Polygon Mumbai
- **Storage**: IPFS/Pinata for metadata

## 📁 Project Structure

```
├── contracts/          # Solidity smart contracts
├── frontend/           # Next.js React app
├── backend/            # Firebase Functions
├── scripts/            # Deployment scripts
└── docs/              # Documentation
```

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   cp frontend/.env.local.example frontend/.env.local
   # Edit both files with your configuration
   ```

3. **Deploy Smart Contracts**
   ```bash
   npx hardhat compile
   npx hardhat deploy --network mumbai
   ```

4. **Deploy Backend**
   ```bash
   cd backend
   firebase login
   firebase deploy
   ```

5. **Run Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

## 🎫 Features

- ✅ NFT Ticket Minting
- ✅ QR Code Generation & Scanning
- ✅ Dynamic Metadata Updates
- ✅ Post-Event Rewards
- ✅ Loyalty Token System
- ✅ Event Organizer Dashboard

## 📖 Detailed Setup

See individual README files in each directory for detailed setup instructions.