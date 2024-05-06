const { expect } = require("chai");
const hre = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const account1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

describe("Self Destruct", function () {
  async function setup() {
    const selfDestructOnCancun = await ethers.deployContract(
      "SelfDestructOnCancun",
      { value: 10000 }
    );

    return { selfDestructOnCancun };
  }

  it("Self Destruct on Cancun - different blocks", async function () {
    const { selfDestructOnCancun } = await loadFixture(setup);
    const contractAddress = await selfDestructOnCancun.getAddress();
    console.log("selfDestructOnCancun", contractAddress);
    console.log(
      "contract balance",
      await ethers.provider.getBalance(contractAddress)
    );

    await selfDestructOnCancun.kill(account1);

    console.log(
      "selfDestructOnCancun after killed",
      await selfDestructOnCancun.getAddress()
    );

    console.log(
      "selfDestructOnCancun balance after killed",
      await ethers.provider.getBalance(contractAddress)
    );

    await selfDestructOnCancun.updateA(321);
    console.log("a value: ", await selfDestructOnCancun.a());
  });

  it.skip("Self Destruct on Cancun - same blocks", async function () {});

  it.skip("Self Destruct prior Cancun by EOA", async function () {
    const { selfDestructOnCancun } = await loadFixture(setup);
    console.log(
      "selfDestructOnCancun",
      await selfDestructOnCancun.getAddress()
    );

    await selfDestructOnCancun.kill(account1);

    console.log(
      "selfDestructOnCancun",
      await selfDestructOnCancun.getAddress()
    );

    await selfDestructOnCancun.updateA(321);
    console.log("a value: ", await selfDestructOnCancun.a());
  });
});
