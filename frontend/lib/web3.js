import { ethers } from 'ethers';

// Contract ABIs (simplified for demo - in production, import from artifacts)
export const NFT_ABI = [
  "function mintTicket(address to, uint256 eventId, string memory eventName, string memory qrCode, string memory initialTokenURI) public returns (uint256)",
  "function markAsAttended(uint256 tokenId, string memory attendedTokenURI) public",
  "function unlockReward(uint256 tokenId, string memory rewardTokenURI) public",
  "function getTicketInfo(uint256 tokenId) public view returns (tuple(uint256 eventId, address holder, uint8 state, uint256 mintedAt, uint256 attendedAt, uint256 rewardedAt, string qrCode))",
  "function totalSupply() public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function addAuthorizedScanner(address scanner) public",
  "event TicketMinted(uint256 indexed tokenId, address indexed holder, uint256 eventId)",
  "event TicketScanned(uint256 indexed tokenId, address indexed scanner)",
  "event RewardUnlocked(uint256 indexed tokenId, address indexed holder)"
];

export const LOYALTY_ABI = [
  "function claimAttendanceReward(address attendee, uint256 eventId, bool isEarlyBird) public",
  "function balanceOf(address account) public view returns (uint256)",
  "function transfer(address to, uint256 amount) public returns (bool)",
  "event RewardClaimed(address indexed user, uint256 amount, uint256 eventId)"
];

export const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
};

export const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

export const getNFTContract = async (withSigner = false) => {
  const address = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
  if (withSigner) {
    const signer = await getSigner();
    return new ethers.Contract(address, NFT_ABI, signer);
  }
  const provider = getProvider();
  return new ethers.Contract(address, NFT_ABI, provider);
};

export const getLoyaltyContract = async (withSigner = false) => {
  const address = process.env.NEXT_PUBLIC_LOYALTY_TOKEN_ADDRESS;
  if (withSigner) {
    const signer = await getSigner();
    return new ethers.Contract(address, LOYALTY_ABI, signer);
  }
  const provider = getProvider();
  return new ethers.Contract(address, LOYALTY_ABI, provider);
};

export const connectWallet = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { provider, signer, address };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  } else {
    throw new Error('MetaMask not found');
  }
};