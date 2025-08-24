const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const { ethers } = require('ethers');

admin.initializeApp();

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

// Validate QR code and mark attendance
exports.validateTicket = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { tokenId, qrCode, scannerAddress } = req.body;
      
      if (!tokenId || !qrCode || !scannerAddress) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      // Initialize provider and contract
      const provider = new ethers.JsonRpcProvider(functions.config().blockchain.rpc_url);
      const contract = new ethers.Contract(
        functions.config().contracts.nft_address,
        NFT_ABI,
        provider
      );

      // Get ticket info
      const ticketInfo = await contract.getTicketInfo(tokenId);
      
      // Validate QR code matches
      if (ticketInfo.qrCode !== qrCode) {
        return res.status(400).json({ error: 'Invalid QR code' });
      }

      // Check if ticket is unused
      if (ticketInfo.state !== 0) {
        return res.status(400).json({ error: 'Ticket already used' });
      }

      // Store validation in Firestore
      await admin.firestore().collection('ticket_validations').add({
        tokenId: tokenId,
        eventId: ticketInfo.eventId.toString(),
        holder: ticketInfo.holder,
        scanner: scannerAddress,
        validatedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'validated'
      });

      res.json({
        success: true,
        message: 'Ticket validated successfully',
        ticketInfo: {
          tokenId,
          eventId: ticketInfo.eventId.toString(),
          holder: ticketInfo.holder,
          state: ticketInfo.state
        }
      });

    } catch (error) {
      console.error('Error validating ticket:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Get user's tickets
exports.getUserTickets = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { userAddress } = req.query;
      
      if (!userAddress) {
        return res.status(400).json({ error: 'User address required' });
      }

      // Query Firestore for user's tickets
      const ticketsSnapshot = await admin.firestore()
        .collection('tickets')
        .where('holder', '==', userAddress.toLowerCase())
        .get();

      const tickets = [];
      ticketsSnapshot.forEach(doc => {
        tickets.push({ id: doc.id, ...doc.data() });
      });

      res.json({ tickets });

    } catch (error) {
      console.error('Error getting user tickets:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Process loyalty rewards
exports.processLoyaltyReward = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { attendeeAddress, eventId, isEarlyBird } = req.body;
      
      if (!attendeeAddress || !eventId) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      // Check if reward already claimed
      const existingReward = await admin.firestore()
        .collection('loyalty_rewards')
        .where('attendee', '==', attendeeAddress.toLowerCase())
        .where('eventId', '==', eventId)
        .get();

      if (!existingReward.empty) {
        return res.status(400).json({ error: 'Reward already claimed for this event' });
      }

      // Calculate reward amount
      const baseReward = 100; // 100 tokens
      const earlyBirdBonus = isEarlyBird ? 50 : 0;
      const totalReward = baseReward + earlyBirdBonus;

      // Store reward record
      await admin.firestore().collection('loyalty_rewards').add({
        attendee: attendeeAddress.toLowerCase(),
        eventId: eventId,
        amount: totalReward,
        isEarlyBird: isEarlyBird || false,
        claimedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'pending'
      });

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
});

// Get event statistics
exports.getEventStats = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { eventId } = req.query;
      
      if (!eventId) {
        return res.status(400).json({ error: 'Event ID required' });
      }

      // Get ticket validations for this event
      const validationsSnapshot = await admin.firestore()
        .collection('ticket_validations')
        .where('eventId', '==', eventId)
        .get();

      const totalAttendees = validationsSnapshot.size;
      const attendees = [];
      
      validationsSnapshot.forEach(doc => {
        const data = doc.data();
        attendees.push({
          holder: data.holder,
          validatedAt: data.validatedAt,
          scanner: data.scanner
        });
      });

      // Get loyalty rewards for this event
      const rewardsSnapshot = await admin.firestore()
        .collection('loyalty_rewards')
        .where('eventId', '==', eventId)
        .get();

      const totalRewards = rewardsSnapshot.size;
      let totalTokensDistributed = 0;

      rewardsSnapshot.forEach(doc => {
        totalTokensDistributed += doc.data().amount;
      });

      res.json({
        eventId,
        totalAttendees,
        totalRewards,
        totalTokensDistributed,
        attendees
      });

    } catch (error) {
      console.error('Error getting event stats:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Webhook for blockchain events
exports.blockchainWebhook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { event, data } = req.body;
      
      switch (event) {
        case 'TicketMinted':
          await admin.firestore().collection('tickets').add({
            tokenId: data.tokenId,
            holder: data.holder.toLowerCase(),
            eventId: data.eventId,
            mintedAt: admin.firestore.FieldValue.serverTimestamp(),
            state: 'unused'
          });
          break;
          
        case 'TicketScanned':
          await admin.firestore().collection('ticket_validations').add({
            tokenId: data.tokenId,
            scanner: data.scanner.toLowerCase(),
            scannedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          break;
          
        case 'RewardUnlocked':
          await admin.firestore().collection('rewards').add({
            tokenId: data.tokenId,
            holder: data.holder.toLowerCase(),
            unlockedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          break;
      }

      res.json({ success: true, message: 'Webhook processed' });

    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});