const { ethers } = require("hardhat");

async function main() {
  // Compile the smart contract
  const MyContract = await ethers.getContractFactory("NFTMarketplace");
  const contract = await MyContract.deploy();

  console.log("Contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });