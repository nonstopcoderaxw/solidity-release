const { expect } = require("chai");
const hre = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("deploy AccessPrivateState contract", function () {
  async function CounterLockFixture() {
    const acessPrivateState = await ethers.deployContract("Vault", [
      ethers.encodeBytes32String("pw0"),
    ]);

    return { acessPrivateState };
  }

  it("access private slot0", async function () {
    const { acessPrivateState } = await loadFixture(CounterLockFixture);
    console.log(
      "acessPrivateState.address",
      await acessPrivateState.getAddress()
    );

    // it can return even if the slot0 stores a private variable
    // private variable only means another contract can't read it bcos a contract can't read other contract's storage layout
    // but web3js client can read a contract's storage layout
    const slot0 = await ethers.provider.getStorage(
      await acessPrivateState.getAddress(),
      0
    );

    console.log("slot0", slot0);
  });

  it("access a array via storage layout", async function () {
    const { acessPrivateState } = await loadFixture(CounterLockFixture);
    const slot3 = await ethers.provider.getStorage(
      await acessPrivateState.getAddress(),
      3
    );

    console.log("slot3", slot3);

    console.log(await acessPrivateState.getArrayLocation(3, 0, 3));
  });
});
