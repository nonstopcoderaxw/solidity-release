require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-foundry");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/<key>",
      //accounts: [privateKey1, privateKey2, ...]
    },
  },
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: "cancun",
    },
  },
};
