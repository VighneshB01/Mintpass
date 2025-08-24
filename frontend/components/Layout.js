import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { connectWallet } from '../lib/web3';
import toast from 'react-hot-toast';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleConnectWallet = async () => {
    try {
      const { address } = await connectWallet();
      setWalletAddress(address);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setWalletAddress('');
      router.push('/');
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                🎫 NFT Ticketing
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-sm text-gray-600">
                  {user.email}
                </span>
              )}
              
              {walletAddress && (
                <span className="text-sm text-gray-600">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              )}
              
              {!walletAddress && (
                <button
                  onClick={handleConnectWallet}
                  className="btn-primary"
                >
                  Connect Wallet
                </button>
              )}
              
              {user && (
                <button
                  onClick={handleSignOut}
                  className="btn-secondary"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}