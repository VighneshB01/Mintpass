import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { getNFTContract, connectWallet } from '../lib/web3';
import { uploadToIPFS, createTicketMetadata } from '../lib/ipfs';
import toast from 'react-hot-toast';

export default function Organizer() {
  const [user, setUser] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventId, setEventId] = useState('');
  const [attendeeAddress, setAttendeeAddress] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      setWalletConnected(true);
      toast.success('Wallet connected!');
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleMintTicket = async (e) => {
    e.preventDefault();
    if (!walletConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      // Generate QR code data
      const qrCode = `ticket-${eventId}-${Date.now()}`;
      
      // Create and upload metadata to IPFS
      const metadata = createTicketMetadata(eventName, eventId, 'UNUSED', qrCode);
      const metadataURI = await uploadToIPFS(metadata);
      
      // Mint the NFT ticket
      const contract = await getNFTContract(true);
      const tx = await contract.mintTicket(
        attendeeAddress,
        eventId,
        eventName,
        qrCode,
        metadataURI
      );
      
      await tx.wait();
      toast.success('Ticket minted successfully!');
      
      // Reset form
      setEventName('');
      setEventId('');
      setAttendeeAddress('');
    } catch (error) {
      console.error('Error minting ticket:', error);
      toast.error('Failed to mint ticket');
    } finally {
      setLoading(false);
    }
  };

  const mintDemoTickets = async () => {
    if (!walletConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      const demoEvents = [
        { name: 'Tech Conference 2024', id: '1001' },
        { name: 'Music Festival', id: '1002' },
        { name: 'Art Exhibition', id: '1003' }
      ];

      const contract = await getNFTContract(true);
      const signer = await contract.runner;
      const userAddress = await signer.getAddress();

      for (const event of demoEvents) {
        const qrCode = `ticket-${event.id}-${Date.now()}`;
        const metadata = createTicketMetadata(event.name, event.id, 'UNUSED', qrCode);
        const metadataURI = await uploadToIPFS(metadata);
        
        const tx = await contract.mintTicket(
          userAddress,
          event.id,
          event.name,
          qrCode,
          metadataURI
        );
        
        await tx.wait();
      }

      toast.success('Demo tickets minted successfully!');
    } catch (error) {
      console.error('Error minting demo tickets:', error);
      toast.error('Failed to mint demo tickets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Event Organizer Panel</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="btn-secondary"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Wallet Connection */}
      {!walletConnected && (
        <div className="card bg-yellow-50 border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Connect Wallet Required
          </h3>
          <p className="text-yellow-700 mb-4">
            You need to connect your wallet to mint tickets and manage events.
          </p>
          <button onClick={handleConnectWallet} className="btn-primary">
            Connect Wallet
          </button>
        </div>
      )}

      {/* Mint Ticket Form */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Mint New Ticket</h2>
        <form onSubmit={handleMintTicket} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Name
            </label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="e.g., Tech Conference 2024"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event ID
            </label>
            <input
              type="number"
              required
              className="input-field"
              placeholder="e.g., 1001"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attendee Address
            </label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="0x..."
              value={attendeeAddress}
              onChange={(e) => setAttendeeAddress(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !walletConnected}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Minting...' : 'Mint Ticket'}
          </button>
        </form>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <button
            onClick={mintDemoTickets}
            disabled={loading || !walletConnected}
            className="w-full btn-secondary disabled:opacity-50"
          >
            🎫 Mint Demo Tickets (for testing)
          </button>
          
          <div className="text-sm text-gray-600">
            <p><strong>Demo tickets will be minted to your connected wallet address</strong></p>
            <p>• Tech Conference 2024 (ID: 1001)</p>
            <p>• Music Festival (ID: 1002)</p>
            <p>• Art Exhibition (ID: 1003)</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          📋 How to Use
        </h3>
        <div className="text-blue-700 space-y-2 text-sm">
          <p><strong>1. Connect Wallet:</strong> Connect your MetaMask wallet to interact with contracts</p>
          <p><strong>2. Mint Tickets:</strong> Create NFT tickets for your events</p>
          <p><strong>3. QR Scanning:</strong> Use the dashboard to scan tickets at events</p>
          <p><strong>4. Rewards:</strong> Attendees automatically receive loyalty tokens</p>
        </div>
      </div>
    </div>
  );
}