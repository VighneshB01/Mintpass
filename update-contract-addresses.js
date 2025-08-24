const fs = require('fs');
const path = require('path');

function updateContractAddresses() {
  try {
    // Read the deployment file
    const deploymentPath = path.join('deployments', 'mumbai.json');
    if (!fs.existsSync(deploymentPath)) {
      console.log('❌ No deployment file found. Please deploy contracts first.');
      return;
    }

    const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
    const nftAddress = deployment.contracts.DynamicNFTTicket;
    const loyaltyAddress = deployment.contracts.LoyaltyToken;

    console.log('📋 Updating contract addresses...');
    console.log('NFT Contract:', nftAddress);
    console.log('Loyalty Contract:', loyaltyAddress);

    // Update frontend .env.local
    const frontendEnvPath = path.join('frontend', '.env.local');
    if (fs.existsSync(frontendEnvPath)) {
      let frontendEnv = fs.readFileSync(frontendEnvPath, 'utf8');
      frontendEnv = frontendEnv.replace(
        /NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000/g,
        `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${nftAddress}`
      );
      frontendEnv = frontendEnv.replace(
        /NEXT_PUBLIC_LOYALTY_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000/g,
        `NEXT_PUBLIC_LOYALTY_TOKEN_ADDRESS=${loyaltyAddress}`
      );
      fs.writeFileSync(frontendEnvPath, frontendEnv);
      console.log('✅ Updated frontend .env.local');
    }

    // Update backend .env
    const backendEnvPath = path.join('backend', '.env');
    if (fs.existsSync(backendEnvPath)) {
      let backendEnv = fs.readFileSync(backendEnvPath, 'utf8');
      backendEnv = backendEnv.replace(
        /NFT_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000/g,
        `NFT_CONTRACT_ADDRESS=${nftAddress}`
      );
      backendEnv = backendEnv.replace(
        /LOYALTY_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000/g,
        `LOYALTY_TOKEN_ADDRESS=${loyaltyAddress}`
      );
      fs.writeFileSync(backendEnvPath, backendEnv);
      console.log('✅ Updated backend .env');
    }

    console.log('\n🎉 Contract addresses updated successfully!');
    console.log('\n📋 Your contracts are now ready to use:');
    console.log(`NFT Contract: ${nftAddress}`);
    console.log(`Loyalty Contract: ${loyaltyAddress}`);

  } catch (error) {
    console.error('❌ Error updating contract addresses:', error.message);
  }
}

updateContractAddresses();
