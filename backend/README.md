# NFT Ticketing Backend

Firebase Functions for the Dynamic NFT Ticketing System backend services.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

3. **Login to Firebase**
   ```bash
   firebase login
   ```

4. **Initialize Project**
   ```bash
   firebase init
   ```

5. **Deploy Functions**
   ```bash
   npm run deploy
   ```

## 📁 Project Structure

```
├── index.js            # Main functions file
├── package.json        # Dependencies and scripts
├── firebase.json       # Firebase configuration
├── firestore.rules     # Firestore security rules
└── firestore.indexes.json # Database indexes
```

## 🔧 Functions

### validateTicket
- **Method**: POST
- **Purpose**: Validate QR codes and mark attendance
- **Parameters**: `tokenId`, `qrCode`, `scannerAddress`
- **Returns**: Validation status and ticket info

### getUserTickets
- **Method**: GET
- **Purpose**: Retrieve user's tickets from database
- **Parameters**: `userAddress` (query param)
- **Returns**: Array of user tickets

### processLoyaltyReward
- **Method**: POST
- **Purpose**: Process loyalty token rewards for attendance
- **Parameters**: `attendeeAddress`, `eventId`, `isEarlyBird`
- **Returns**: Reward processing status

### getEventStats
- **Method**: GET
- **Purpose**: Get event attendance statistics
- **Parameters**: `eventId` (query param)
- **Returns**: Event metrics and attendee list

### blockchainWebhook
- **Method**: POST
- **Purpose**: Handle blockchain event notifications
- **Parameters**: `event`, `data`
- **Returns**: Processing confirmation

## 🗄️ Database Schema

### Collections

#### tickets
```javascript
{
  tokenId: string,
  holder: string,
  eventId: string,
  mintedAt: timestamp,
  state: string
}
```

#### ticket_validations
```javascript
{
  tokenId: string,
  eventId: string,
  holder: string,
  scanner: string,
  validatedAt: timestamp,
  status: string
}
```

#### loyalty_rewards
```javascript
{
  attendee: string,
  eventId: string,
  amount: number,
  isEarlyBird: boolean,
  claimedAt: timestamp,
  status: string
}
```

#### events
```javascript
{
  eventId: string,
  name: string,
  description: string,
  date: timestamp,
  organizer: string,
  maxAttendees: number
}
```

## 🔐 Security Rules

Firestore security rules ensure:
- Users can only read their own tickets
- Authenticated users can access validations
- Event organizers can manage their events
- Proper email verification requirements

## 🛠️ Development

### Local Testing
```bash
# Start emulators
npm run serve

# Test functions locally
firebase functions:shell
```

### Environment Configuration
Set Firebase config:
```bash
firebase functions:config:set blockchain.rpc_url="https://rpc-mumbai.maticvigil.com"
firebase functions:config:set contracts.nft_address="0x..."
firebase functions:config:set contracts.loyalty_address="0x..."
```

### Deployment
```bash
# Deploy all functions
npm run deploy

# Deploy specific function
firebase deploy --only functions:validateTicket
```

### Monitoring
```bash
# View logs
npm run logs

# View specific function logs
firebase functions:log --only validateTicket
```

## 📊 Analytics

The backend tracks:
- Ticket minting events
- Attendance validations
- Loyalty reward distributions
- Event participation metrics

## 🔗 Integration

### Frontend Integration
Functions are called from the frontend using HTTP requests:

```javascript
// Example: Validate ticket
const response = await fetch('/api/validateTicket', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ tokenId, qrCode, scannerAddress })
});
```

### Blockchain Integration
Functions interact with smart contracts using ethers.js:

```javascript
const provider = new ethers.JsonRpcProvider(rpcUrl);
const contract = new ethers.Contract(address, abi, provider);
const result = await contract.getTicketInfo(tokenId);
```