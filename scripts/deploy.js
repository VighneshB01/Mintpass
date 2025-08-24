const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🚀 Starting deployment...");
  
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
  
  // Save deployment addresses
  const deploymentInfo = {
    network: hre.network.name,
    deployer: deployer.address,
    contracts: {
      DynamicNFTTicket: nftAddress,
      LoyaltyToken: tokenAddress
    },
    deployedAt: new Date().toISOString(),
    blockNumber: await deployer.provider.getBlockNumber()
  };
  
  fs.writeFileSync(
    `deployments/${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n📄 Deployment info saved to:", `deployments/${hre.network.name}.json`);
  
  // Verify contracts on Polygonscan (if not local network)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n🔍 Waiting for block confirmations...");
    await nftTicket.deploymentTransaction().wait(5);
    await loyaltyToken.deploymentTransaction().wait(5);
    
    console.log("Verifying contracts...");
    try {
      await hre.run("verify:verify", {
        address: nftAddress,
        constructorArguments: [deployer.address],
      });
      
      await hre.run("verify:verify", {
        address: tokenAddress,
        constructorArguments: [deployer.address],
      });
      
      console.log("✅ Contracts verified on Polygonscan");
    } catch (error) {
      console.log("❌ Verification failed:", error.message);
    }
  }
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("📋 NFT Contract:", nftAddress);
  console.log("🎁 Token Contract:", tokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });