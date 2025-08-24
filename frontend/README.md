# NFT Ticketing Frontend

Next.js React application for the Dynamic NFT Ticketing System.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
├── components/          # Reusable React components
│   ├── Layout.js       # Main layout wrapper
│   ├── TicketCard.js   # Individual ticket display
│   └── QRScanner.js    # QR code scanning component
├── lib/                # Utility libraries
│   ├── firebase.js     # Firebase configuration
│   ├── web3.js         # Web3 and contract interactions
│   └── ipfs.js         # IPFS metadata handling
├── pages/              # Next.js pages
│   ├── index.js        # Login/signup page
│   ├── dashboard.js    # User dashboard
│   └── organizer.js    # Event organizer panel
└── styles/             # CSS styles
    └── globals.css     # Global styles with Tailwind
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` file with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Blockchain Configuration
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=deployed_contract_address
NEXT_PUBLIC_LOYALTY_TOKEN_ADDRESS=deployed_token_address
NEXT_PUBLIC_NETWORK_ID=80001
NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com

# IPFS Configuration
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
```

## 🎯 Features

- **User Authentication**: Firebase Auth integration
- **Wallet Connection**: MetaMask integration
- **NFT Ticket Display**: Dynamic ticket cards with state visualization
- **QR Code Generation**: Automatic QR code creation for tickets
- **QR Code Scanning**: Camera-based ticket validation
- **Event Management**: Organizer panel for minting tickets
- **Responsive Design**: Mobile-friendly interface

## 🔗 Dependencies

- **Next.js 14**: React framework
- **Tailwind CSS**: Utility-first CSS framework
- **Ethers.js**: Ethereum library
- **Firebase**: Authentication and database
- **QRCode**: QR code generation
- **QR-Scanner**: QR code scanning
- **React Hot Toast**: Notifications

## 📱 Usage

### For Attendees
1. Sign up/login with email
2. Connect MetaMask wallet
3. View your tickets on dashboard
4. Generate QR codes for event entry
5. Earn loyalty tokens for attendance

### For Organizers
1. Access organizer panel
2. Connect wallet (must be contract owner)
3. Mint tickets for events
4. Manage event attendees
5. Distribute loyalty rewards

## 🛠️ Development

### Adding New Components
```bash
# Create new component
touch components/NewComponent.js
```

### Adding New Pages
```bash
# Create new page
touch pages/new-page.js
```

### Styling Guidelines
- Use Tailwind CSS classes
- Follow existing component patterns
- Maintain responsive design
- Use consistent color scheme (primary-600, etc.)