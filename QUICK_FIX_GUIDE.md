# 🚨 Quick Fix Guide - NFT Ticketing System

## ❌ **Current Issues:**

1. **Missing Environment Files** - No .env files exist
2. **Smart Contracts Not Deployed** - Contracts at placeholder addresses
3. **Frontend Can't Connect** - "Failed to mint ticket" error
4. **Backend Not Running** - API server not started

## ✅ **Complete Fix Steps:**

### **Step 1: Run the Fix Script**
```bash
# In your project root (Kiro folder)
node fix-all-issues.js
```

### **Step 2: Deploy Smart Contracts**
```bash
# Make sure you have MATIC tokens in your wallet
npx hardhat run scripts/deploy.js --network mumbai
```

### **Step 3: Update Contract Addresses**
```bash
# This will automatically update all environment files
node update-contract-addresses.js
```

### **Step 4: Start the Application**
```bash
# Option 1: Use the automated script
fix-and-deploy.bat

# Option 2: Manual start
cd backend && npm start
# In another terminal:
cd frontend && npm run dev
```

## 🔧 **What Each Script Does:**

### **fix-all-issues.js**
- Creates missing `.env` files
- Sets up Firebase configuration
- Creates deployment directory
- Prepares environment variables

### **update-contract-addresses.js**
- Reads deployed contract addresses
- Updates frontend `.env.local`
- Updates backend `.env`
- Ensures all files have correct addresses

### **fix-and-deploy.bat**
- Runs all fix scripts
- Installs dependencies
- Deploys contracts
- Starts both servers

## 🎯 **Expected Results:**

After running these scripts:
- ✅ Environment files created
- ✅ Smart contracts deployed to Mumbai
- ✅ Contract addresses updated automatically
- ✅ Frontend connects to real contracts
- ✅ "Mint Ticket" button works
- ✅ No more "Failed to mint ticket" errors

## 🚀 **Quick Start:**

1. **Double-click**: `fix-and-deploy.bat`
2. **Wait** for all steps to complete
3. **Open**: http://localhost:3000
4. **Connect** MetaMask to Mumbai testnet
5. **Try minting** a ticket - it should work!

## 💡 **Troubleshooting:**

### **If deployment fails:**
- Check you have MATIC tokens in your wallet
- Ensure MetaMask is connected to Mumbai testnet
- Verify your private key is correct

### **If frontend still shows errors:**
- Restart the frontend: `cd frontend && npm run dev`
- Clear browser cache
- Check MetaMask connection

### **If backend fails:**
- Check port 5001 is not in use
- Restart backend: `cd backend && npm start`

## 🎉 **Success Indicators:**

- ✅ No error messages in terminal
- ✅ Frontend loads at http://localhost:3000
- ✅ Backend API responds at http://localhost:5001/health
- ✅ Wallet connects successfully
- ✅ "Mint Ticket" button works without errors
- ✅ Transactions appear in MetaMask

Your NFT Ticketing System will be fully functional! 🎫
