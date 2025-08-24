# 🌐 Netlify Deployment Guide

## 🚀 Quick Deployment Steps

### 1. **Fix Build Issues**
```bash
# Run the automated fix script
node fix-netlify-build.js

# Or use the batch script
fix-and-push.bat
```

### 2. **Push to GitHub**
```bash
git add .
git commit -m "Fix Netlify build configuration"
git push origin main
```

### 3. **Deploy to Netlify**

1. **Go to Netlify:** https://app.netlify.com/
2. **Click "Add new site"** → **"Import an existing project"**
3. **Connect to GitHub** and select your repository
4. **Build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/out`
5. **Click "Deploy site"**

## 🔧 Environment Variables

Add these in **Netlify Dashboard** → **Site settings** → **Environment variables**:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDGcAmEZTzyEHKk3ORbMYN3JDrHuBOIi9c
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=blockchain-d97f1.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=blockchain-d97f1
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=blockchain-d97f1.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=105566085232
NEXT_PUBLIC_FIREBASE_APP_ID=1:105566085232:web:065570b9f3a117edbb54b5
NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=YOUR_DEPLOYED_NFT_ADDRESS
NEXT_PUBLIC_LOYALTY_TOKEN_ADDRESS=YOUR_DEPLOYED_LOYALTY_ADDRESS
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## 📁 Project Structure for Netlify

```
├── package.json              # Root build script
├── netlify.toml             # Netlify configuration
├── .nvmrc                   # Node version
├── .node-version            # Node version (alternative)
├── frontend/
│   ├── package.json         # Next.js dependencies
│   ├── next.config.js       # Next.js configuration
│   └── out/                 # Build output (auto-generated)
└── backend/                 # API server (separate deployment)
```

## 🔍 Troubleshooting

### **Build Error: "next command not found"**
**Solution:** The fix script updates `package.json` to ensure Next.js is properly installed.

### **Build Error: "Module not found"**
**Solution:** The fix script adds all necessary dependencies to `package.json`.

### **Build Error: "Node version incompatible"**
**Solution:** The fix script creates `.nvmrc` and `.node-version` files.

### **Build Error: "Permission denied"**
**Solution:** The fix script uses `--legacy-peer-deps` flag in `netlify.toml`.

## 🎯 Build Process

1. **Netlify reads `netlify.toml`**
2. **Runs `npm run build`** (from root package.json)
3. **Installs dependencies** in frontend directory
4. **Builds Next.js** application
5. **Outputs to `frontend/out`** directory
6. **Deploys static files** to Netlify CDN

## 📱 Post-Deployment

### **Update Contract Addresses**
After deploying smart contracts, update the environment variables in Netlify with the actual contract addresses.

### **Test the Application**
1. Visit your Netlify URL
2. Connect MetaMask to Mumbai testnet
3. Test ticket minting and QR scanning
4. Verify all features work correctly

### **Custom Domain (Optional)**
1. Go to **Site settings** → **Domain management**
2. Add your custom domain
3. Configure DNS settings

## 🚨 Common Issues & Solutions

### **Issue: Build fails with dependency errors**
```bash
# Solution: Run the fix script
node fix-netlify-build.js
```

### **Issue: Environment variables not loading**
- Check variable names start with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Clear browser cache

### **Issue: API calls failing**
- Ensure backend is deployed separately
- Update `NEXT_PUBLIC_API_URL` in Netlify
- Check CORS configuration

### **Issue: Wallet connection problems**
- Verify RPC URL is correct
- Check MetaMask network settings
- Ensure contract addresses are correct

## 🎉 Success Checklist

- [ ] Build completes without errors
- [ ] Site loads on Netlify URL
- [ ] MetaMask connects successfully
- [ ] Ticket minting works
- [ ] QR code generation works
- [ ] QR code scanning works
- [ ] All environment variables are set
- [ ] Contract addresses are updated

## 📞 Support

If you encounter issues:
1. Check the build logs in Netlify dashboard
2. Verify all environment variables are set
3. Ensure contract addresses are correct
4. Test locally before deploying

---

**Your NFT Ticketing System will be live on the web!** 🌐🎫
