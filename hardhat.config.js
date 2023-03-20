require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: process.env.ALCHEMY_API_KEY,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    }
  },
};

