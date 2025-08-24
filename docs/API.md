# API Documentation

Complete API reference for the Dynamic NFT Ticketing System.

## 🔗 Base URLs

- **Production**: `https://your-project.cloudfunctions.net`
- **Development**: `http://localhost:5001/your-project/us-central1`

## 🔐 Authentication

All API endpoints require Firebase Authentication tokens in the Authorization header:

```
Authorization: Bearer <firebase_id_token>
```

## 📋 Endpoints

### POST /validateTicket

Validate a QR code and mark ticket as attended.

**Request Body:**
```json
{
  "tokenId": "123",
  "qrCode": "ticket-1001-1234567890",
  "scannerAddress": "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ticket validated successfully",
  "ticketInfo": {
    "tokenId": "123",
    "eventId": "1001",
    "holder": "0x123...",
    "state": 0
  }
}
```

**Error Responses:**
- `400`: Missing parameters or invalid QR code
- `500`: Internal server error

---

### GET /getUserTickets

Get all tickets for a specific user address.

**Query Parameters:**
- `userAddress` (required): Ethereum address of the user

**Example:**
```
GET /getUserTickets?userAddress=0x742d35Cc6634C0532925a3b8D4C9db96590c6C87
```

**Response:**
```json
{
  "tickets": [
    {
      "id": "doc_id_123",
      "tokenId": "123",
      "holder": "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
      "eventId": "1001",
      "mintedAt": "2024-01-15T10:30:00Z",
      "state": "unused"
    }
  ]
}
```

---

### POST /processLoyaltyReward

Process loyalty token rewards for event attendance.

**Request Body:**
```json
{
  "attendeeAddress": "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
  "eventId": "1001",
  "isEarlyBird": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Loyalty reward processed",
  "reward": {
    "amount": 150,
    "baseReward": 100,
    "earlyBirdBonus": 50
  }
}
```

---

### GET /getEventStats

Get attendance statistics for a specific event.

**Query Parameters:**
- `eventId` (required): Event identifier

**Example:**
```
GET /getEventStats?eventId=1001
```

**Response:**
```json
{
  "eventId": "1001",
  "totalAttendees": 25,
  "totalRewards": 25,
  "totalTokensDistributed": 3750,
  "attendees": [
    {
      "holder": "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
      "validatedAt": "2024-01-15T14:30:00Z",
      "scanner": "0x456..."
    }
  ]
}
```

---

### POST /blockchainWebhook

Handle blockchain event notifications (internal use).

**Request Body:**
```json
{
  "event": "TicketMinted",
  "data": {
    "tokenId": "123",
    "holder": "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
    "eventId": "1001"
  }
}
```

**Supported Events:**
- `TicketMinted`
- `TicketScanned`
- `RewardUnlocked`

## 🔧 Smart Contract Integration

### Contract Addresses

**Mumbai Testnet:**
- NFT Contract: `process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`
- Loyalty Token: `process.env.NEXT_PUBLIC_LOYALTY_TOKEN_ADDRESS`

### Contract Methods

#### DynamicNFTTicket Contract

```solidity
// Mint a new ticket
function mintTicket(
    address to,
    uint256 eventId,
    string memory eventName,
    string memory qrCode,
    string memory initialTokenURI
) public onlyOwner returns (uint256)

// Mark ticket as attended
function markAsAttended(
    uint256 tokenId,
    string memory attendedTokenURI
) public onlyAuthorizedScanner

// Get ticket information
function getTicketInfo(uint256 tokenId) 
    public view returns (Ticket memory)

// Add authorized scanner
function addAuthorizedScanner(address scanner) public onlyOwner
```

#### LoyaltyToken Contract

```solidity
// Claim attendance reward
function claimAttendanceReward(
    address attendee,
    uint256 eventId,
    bool isEarlyBird
) public onlyOwner

// Get token balance
function balanceOf(address account) public view returns (uint256)
```

## 📱 Frontend Integration

### Web3 Connection

```javascript
import { connectWallet, getNFTContract } from '../lib/web3';

// Connect wallet
const { address, signer } = await connectWallet();

// Get contract instance
const contract = await getNFTContract(true); // with signer
```

### API Calls

```javascript
// Validate ticket
const response = await fetch('/api/validateTicket', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  },
  body: JSON.stringify({
    tokenId: '123',
    qrCode: 'ticket-1001-1234567890',
    scannerAddress: address
  })
});

const result = await response.json();
```

## 🗄️ Database Schema

### Firestore Collections

#### tickets
```javascript
{
  tokenId: string,           // NFT token ID
  holder: string,            // Owner's address (lowercase)
  eventId: string,           // Event identifier
  mintedAt: timestamp,       // When ticket was minted
  state: string,             // "unused", "attended", "rewarded"
  userId?: string            // Firebase user ID (optional)
}
```

#### ticket_validations
```javascript
{
  tokenId: string,           // NFT token ID
  eventId: string,           // Event identifier
  holder: string,            // Ticket holder address
  scanner: string,           // Scanner address
  validatedAt: timestamp,    // When ticket was scanned
  status: string             // "validated"
}
```

#### loyalty_rewards
```javascript
{
  attendee: string,          // Attendee address (lowercase)
  eventId: string,           // Event identifier
  amount: number,            // Reward amount in tokens
  isEarlyBird: boolean,      // Early bird bonus applied
  claimedAt: timestamp,      // When reward was processed
  status: string             // "pending", "claimed"
}
```

#### events
```javascript
{
  eventId: string,           // Unique event identifier
  name: string,              // Event name
  description: string,       // Event description
  date: timestamp,           // Event date
  organizer: string,         // Organizer address
  maxAttendees: number,      // Maximum attendees
  createdAt: timestamp       // When event was created
}
```

## 🔍 Error Handling

### HTTP Status Codes

- `200`: Success
- `400`: Bad Request (missing/invalid parameters)
- `401`: Unauthorized (invalid/missing auth token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

### Error Response Format

```json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

### Common Error Codes

- `INVALID_QR_CODE`: QR code doesn't match ticket
- `TICKET_ALREADY_USED`: Ticket has already been scanned
- `REWARD_ALREADY_CLAIMED`: Loyalty reward already processed
- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `CONTRACT_ERROR`: Smart contract interaction failed

## 🔐 Security

### Rate Limiting

API endpoints are rate-limited to prevent abuse:
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

### Input Validation

All inputs are validated:
- Ethereum addresses must be valid format
- Token IDs must be numeric
- Event IDs must be alphanumeric

### Authentication

- Firebase ID tokens required for all endpoints
- Tokens must be valid and not expired
- Email verification required for write operations

## 📊 Monitoring

### Metrics Tracked

- API response times
- Error rates by endpoint
- Authentication success rates
- Contract interaction success rates
- Database query performance

### Logging

All API calls are logged with:
- Timestamp
- User ID
- Endpoint called
- Response status
- Execution time