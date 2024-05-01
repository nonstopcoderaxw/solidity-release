const { expect } = require("chai");
const hre = require("hardhat");

describe("Blob tx", function () {
  it("Get a blob mainnet tx 0x2ea19986a6866b6efd2ac292fa8132b0bbf1fcc478560525ce43d6c300323652", async function () {
    // Connect to the network
    const provider = ethers.provider;
    console.log("provider", provider);
    const txHash =
      "0x2ea19986a6866b6efd2ac292fa8132b0bbf1fcc478560525ce43d6c300323652";

    // Fetch the transaction
    const transaction = await provider.getTransaction(txHash);

    if (transaction) {
      console.log("Transaction details:", transaction);
    } else {
      console.log("Transaction not found!");
    }
  });
});
