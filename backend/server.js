const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Contract ABIs and addresses
const NFT_ABI = [
  "function getTicketInfo(uint256 tokenId) public view returns (tuple(uint256 eventId, address holder, uint8 state, uint256 mintedAt, uint256 attendedAt, uint256 rewardedAt, string qrCode))",
  "function markAsAttended(uint256 tokenId, string memory attendedTokenURI) public",
  "function unlockReward(uint256 tokenId, string memory rewardTokenURI) public",
  "event TicketScanned(uint256 indexed tokenId, address indexed scanner)",
  "event RewardUnlocked(uint256 indexed tokenId, address indexed holder)"
];

const LOYALTY_ABI = [
  "function claimAttendanceReward(address attendee, uint256 eventId, bool isEarlyBird) public",
  "function balanceOf(address account) public view returns (uint256)"
];

// In-memory storage (replace with database in production)
const ticketValidations = [];
const userTickets = [];
const loyaltyRewards = [];
const eventStats = {};

// Initialize provider
const provider = new ethers.JsonRpcProvider(process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com");

// Validate QR code and mark attendance
app.post('/validateTicket', async (req, res) => {
  try {
    const { tokenId, qrCode, scannerAddress } = req.body;
    
    if (!tokenId || !qrCode || !scannerAddress) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // For demo purposes, we'll simulate the validation
    // In production, you'd interact with the actual smart contract
    const ticketInfo = {
      tokenId: tokenId,
      eventId: '1001',
      holder: '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87',
      state: 0,
      qrCode: qrCode
    };

    // Store validation
    const validation = {
      tokenId: tokenId,
      eventId: ticketInfo.eventId,
      holder: ticketInfo.holder,
      scanner: scannerAddress,
      validatedAt: new Date().toISOString(),
      status: 'validated'
    };
    
    ticketValidations.push(validation);

    res.json({
      success: true,
      message: 'Ticket validated successfully',
      ticketInfo: {
        tokenId,
        eventId: ticketInfo.eventId,
        holder: ticketInfo.holder,
        state: ticketInfo.state
      }
    });

  } catch (error) {
    console.error('Error validating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's tickets
app.get('/getUserTickets', async (req, res) => {
  try {
    const { userAddress } = req.query;
    
    if (!userAddress) {
      return res.status(400).json({ error: 'User address required' });
    }

    // For demo purposes, return sample tickets
    const tickets = [
      {
        id: '1',
        tokenId: '123',
        holder: userAddress.toLowerCase(),
        eventId: '1001',
        mintedAt: new Date().toISOString(),
        state: 'unused'
      }
    ];

    res.json({ tickets });

  } catch (error) {
    console.error('Error getting user tickets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Process loyalty rewards
app.post('/processLoyaltyReward', async (req, res) => {
  try {
    const { attendeeAddress, eventId, isEarlyBird } = req.body;
    
    if (!attendeeAddress || !eventId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Check if reward already claimed
    const existingReward = loyaltyRewards.find(
      reward => reward.attendee === attendeeAddress.toLowerCase() && reward.eventId === eventId
    );

    if (existingReward) {
      return res.status(400).json({ error: 'Reward already claimed for this event' });
    }

    // Calculate reward amount
    const baseReward = 100;
    const earlyBirdBonus = isEarlyBird ? 50 : 0;
    const totalReward = baseReward + earlyBirdBonus;

    // Store reward record
    const reward = {
      attendee: attendeeAddress.toLowerCase(),
      eventId: eventId,
      amount: totalReward,
      isEarlyBird: isEarlyBird || false,
      claimedAt: new Date().toISOString(),
      status: 'pending'
    };

    loyaltyRewards.push(reward);

    res.json({
      success: true,
      message: 'Loyalty reward processed',
      reward: {
        amount: totalReward,
        baseReward,
        earlyBirdBonus
      }
    });

  } catch (error) {
    console.error('Error processing loyalty reward:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get event statistics
app.get('/getEventStats', async (req, res) => {
  try {
    const { eventId } = req.query;
    
    if (!eventId) {
      return res.status(400).json({ error: 'Event ID required' });
    }

    // Get ticket validations for this event
    const eventValidations = ticketValidations.filter(v => v.eventId === eventId);
    const totalAttendees = eventValidations.length;

    // Get loyalty rewards for this event
    const eventRewards = loyaltyRewards.filter(r => r.eventId === eventId);
    const totalRewards = eventRewards.length;
    const totalTokensDistributed = eventRewards.reduce((sum, r) => sum + r.amount, 0);

    res.json({
      eventId,
      totalAttendees,
      totalRewards,
      totalTokensDistributed,
      attendees: eventValidations.map(v => ({
        holder: v.holder,
        validatedAt: v.validatedAt,
        scanner: v.scanner
      }))
    });

  } catch (error) {
    console.error('Error getting event stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Webhook for blockchain events
app.post('/blockchainWebhook', async (req, res) => {
  try {
    const { event, data } = req.body;
    
    switch (event) {
      case 'TicketMinted':
        userTickets.push({
          tokenId: data.tokenId,
          holder: data.holder.toLowerCase(),
          eventId: data.eventId,
          mintedAt: new Date().toISOString(),
          state: 'unused'
        });
        break;
        
      case 'TicketScanned':
        ticketValidations.push({
          tokenId: data.tokenId,
          scanner: data.scanner.toLowerCase(),
          scannedAt: new Date().toISOString()
        });
        break;
        
      case 'RewardUnlocked':
        loyaltyRewards.push({
          tokenId: data.tokenId,
          holder: data.holder.toLowerCase(),
          unlockedAt: new Date().toISOString()
        });
        break;
    }

    res.json({ success: true, message: 'Webhook processed' });

  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'NFT Ticketing API Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NFT Ticketing API Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}`);
});
