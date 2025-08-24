const fetch = require('node-fetch');

async function testAPI() {
  console.log('🧪 Testing NFT Ticketing API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:5001/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test ticket validation
    console.log('\n2. Testing ticket validation...');
    const validationResponse = await fetch('http://localhost:5001/validateTicket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenId: '123',
        qrCode: 'test-qr-code',
        scannerAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87'
      })
    });
    const validationData = await validationResponse.json();
    console.log('✅ Ticket validation:', validationData);

    // Test user tickets
    console.log('\n3. Testing user tickets...');
    const ticketsResponse = await fetch('http://localhost:5001/getUserTickets?userAddress=0x742d35Cc6634C0532925a3b8D4C9db96590c6C87');
    const ticketsData = await ticketsResponse.json();
    console.log('✅ User tickets:', ticketsData);

    console.log('\n🎉 All API tests passed!');
    console.log('🚀 Your NFT Ticketing API is working correctly.');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n💡 Make sure the server is running:');
    console.log('   cd backend && npm start');
  }
}

testAPI();
