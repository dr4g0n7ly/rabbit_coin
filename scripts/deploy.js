const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const RabbitCoin = await hre.ethers.getContractFactory("RabbitCoin");
  const rabbitCoin = await RabbitCoin.deploy();
  await rabbitCoin.deployed();

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }

  //This writes the ABI and address to the rabbitcoin.json
  fs.writeFileSync('./client/src/RabbitCoin.json', JSON.stringify(Mdata))

  console.log("Deployed successfully");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });