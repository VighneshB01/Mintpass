const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

export const uploadToIPFS = async (metadata) => {
  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY,
      },
      body: JSON.stringify({
        pinataContent: metadata,
        pinataMetadata: {
          name: `ticket-metadata-${Date.now()}`,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to upload to IPFS');
    }

    const data = await response.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw error;
  }
};

export const createTicketMetadata = (eventName, eventId, state = 'UNUSED', qrCode = '') => {
  const stateImages = {
    UNUSED: 'https://gateway.pinata.cloud/ipfs/QmUnusedTicketImage',
    ATTENDED: 'https://gateway.pinata.cloud/ipfs/QmAttendedTicketImage',
    REWARDED: 'https://gateway.pinata.cloud/ipfs/QmRewardedTicketImage'
  };

  return {
    name: `${eventName} - Ticket #${eventId}`,
    description: `Dynamic NFT ticket for ${eventName}. Current state: ${state}`,
    image: stateImages[state],
    attributes: [
      {
        trait_type: 'Event',
        value: eventName
      },
      {
        trait_type: 'State',
        value: state
      },
      {
        trait_type: 'Event ID',
        value: eventId.toString()
      },
      {
        trait_type: 'QR Code',
        value: qrCode
      }
    ]
  };
};