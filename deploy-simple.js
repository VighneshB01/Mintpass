const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...");
  
  try {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
    
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "MATIC");
    
    // Deploy DynamicNFTTicket contract
    console.log("\n📋 Deploying DynamicNFTTicket...");
    const DynamicNFTTicket = await ethers.getContractFactory("DynamicNFTTicket");
    const nftTicket = await DynamicNFTTicket.deploy(deployer.address);
    await nftTicket.waitForDeployment();
    
    const nftAddress = await nftTicket.getAddress();
    console.log("✅ DynamicNFTTicket deployed to:", nftAddress);
    
    // Deploy LoyaltyToken contract
    console.log("\n🎁 Deploying LoyaltyToken...");
    const LoyaltyToken = await ethers.getContractFactory("LoyaltyToken");
    const loyaltyToken = await LoyaltyToken.deploy(deployer.address);
    await loyaltyToken.waitForDeployment();
    
    const tokenAddress = await loyaltyToken.getAddress();
    console.log("✅ LoyaltyToken deployed to:", tokenAddress);
    
    console.log("\n🎉 Deployment completed successfully!");
    console.log("📋 NFT Contract:", nftAddress);
    console.log("🎁 Token Contract:", tokenAddress);
    
    // Save to a simple file
    const fs = require('fs');
    const deploymentInfo = {
      nftContract: nftAddress,
      loyaltyContract: tokenAddress,
      deployer: deployer.address,
      deployedAt: new Date().toISOString()
    };
    
    fs.writeFileSync('deployment-addresses.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("📄 Contract addresses saved to: deployment-addresses.json");
    
  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
