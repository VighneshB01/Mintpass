import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { getNFTContract, getLoyaltyContract } from '../lib/web3';
import TicketCard from '../components/TicketCard';
import QRScanner from '../components/QRScanner';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loyaltyBalance, setLoyaltyBalance] = useState('0');
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        loadUserData(user);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadUserData = async (user) => {
    try {
      // This would typically load user's tickets from blockchain
      // For demo purposes, we'll show placeholder data
      setTickets([]);
      setLoyaltyBalance('0');
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleQRScan = async (qrData) => {
    try {
      const contract = await getNFTContract(true);
      
      // Mark ticket as attended
      const tx = await contract.markAsAttended(
        qrData.tokenId,
        'https://gateway.pinata.cloud/ipfs/QmAttendedTicketImage' // Updated metadata URI
      );
      
      await tx.wait();
      toast.success('Ticket marked as attended!');
      
      // Reload tickets
      loadUserData(user);
      setShowScanner(false);
    } catch (error) {
      console.error('Error scanning ticket:', error);
      toast.error('Failed to scan ticket');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowScanner(true)}
            className="btn-primary"
          >
            📱 Scan QR Code
          </button>
          <button
            onClick={() => router.push('/organizer')}
            className="btn-secondary"
          >
            🎪 Organizer Panel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">My Tickets</h3>
          <p className="text-3xl font-bold text-primary-600">{tickets.length}</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loyalty Tokens</h3>
          <p className="text-3xl font-bold text-green-600">{loyaltyBalance}</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Events Attended</h3>
          <p className="text-3xl font-bold text-purple-600">
            {tickets.filter(t => t.state >= 1).length}
          </p>
        </div>
      </div>

      {/* Tickets Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Tickets</h2>
        {tickets.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 mb-4">No tickets found</p>
            <p className="text-sm text-gray-400">
              Visit the organizer panel to mint some demo tickets
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => (
              <TicketCard
                key={index}
                ticket={ticket}
                tokenId={index}
              />
            ))}
          </div>
        )}
      </div>

      {showScanner && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}