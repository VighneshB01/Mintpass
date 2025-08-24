import { useState } from 'react';
import QRCode from 'qrcode';

const stateColors = {
  0: 'bg-yellow-100 text-yellow-800', // UNUSED
  1: 'bg-green-100 text-green-800',   // ATTENDED
  2: 'bg-purple-100 text-purple-800'  // REWARDED
};

const stateNames = {
  0: 'Unused',
  1: 'Attended', 
  2: 'Rewarded'
};

export default function TicketCard({ ticket, tokenId, onScan }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQR, setShowQR] = useState(false);

  const generateQRCode = async () => {
    try {
      const qrData = JSON.stringify({
        tokenId: tokenId,
        eventId: ticket.eventId.toString(),
        holder: ticket.holder,
        qrCode: ticket.qrCode
      });
      
      const url = await QRCode.toDataURL(qrData);
      setQrCodeUrl(url);
      setShowQR(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp.toString() === '0') return 'Not set';
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Ticket #{tokenId}
          </h3>
          <p className="text-sm text-gray-600">
            Event ID: {ticket.eventId.toString()}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stateColors[ticket.state]}`}>
          {stateNames[ticket.state]}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p><strong>Holder:</strong> {ticket.holder.slice(0, 6)}...{ticket.holder.slice(-4)}</p>
        <p><strong>Minted:</strong> {formatDate(ticket.mintedAt)}</p>
        {ticket.attendedAt.toString() !== '0' && (
          <p><strong>Attended:</strong> {formatDate(ticket.attendedAt)}</p>
        )}
        {ticket.rewardedAt.toString() !== '0' && (
          <p><strong>Rewarded:</strong> {formatDate(ticket.rewardedAt)}</p>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={generateQRCode}
          className="btn-primary flex-1"
        >
          Show QR Code
        </button>
        
        {ticket.state === 0 && onScan && (
          <button
            onClick={() => onScan(tokenId)}
            className="btn-secondary"
          >
            Mark Attended
          </button>
        )}
      </div>

      {showQR && qrCodeUrl && (
        <div className="mt-4 text-center">
          <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
          <button
            onClick={() => setShowQR(false)}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Hide QR Code
          </button>
        </div>
      )}
    </div>
  );
}