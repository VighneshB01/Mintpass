import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

export default function QRScanner({ onScan, onClose }) {
  const videoRef = useRef(null);
  const [scanner, setScanner] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          try {
            const data = JSON.parse(result.data);
            onScan(data);
          } catch (error) {
            setError('Invalid QR code format');
          }
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      qrScanner.start().catch((err) => {
        setError('Failed to start camera: ' + err.message);
      });

      setScanner(qrScanner);

      return () => {
        qrScanner.stop();
        qrScanner.destroy();
      };
    }
  }, [onScan]);

  const handleClose = () => {
    if (scanner) {
      scanner.stop();
      scanner.destroy();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Scan QR Code</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="relative">
          <video
            ref={videoRef}
            className="w-full rounded-lg"
            style={{ maxHeight: '300px' }}
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Position the QR code within the camera view
          </p>
        </div>
      </div>
    </div>
  );
}