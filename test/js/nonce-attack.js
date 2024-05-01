const { expect } = require("chai");
const hre = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Nonce attack", function () {
  async function setup() {
    const deployerDeployer = await ethers.deployContract("DeployerDeployer");
    console.log(
      "deployerDeployer address in fixture",
      await deployerDeployer.getAddress()
    );
    return { deployerDeployer };
  }

  it.skip("'create' address", async function () {
    const { deployerDeployer } = await loadFixture(setup);
    const actualAddress = await deployerDeployer.getAddress();
    console.log("deployerDeployer address", actualAddress);
    const deployerEOA = (await ethers.getSigners())[0];

    const txCount = await ethers.provider.getTransactionCount(
      deployerEOA.address
    );
    console.log("txCount", txCount);
    // contract address = last 20 bytes of sha3(rlp_encode(sender, nonce))
    // find contract address when the nonce is 0
    const transaction = {
      from: deployerEOA.address,
      nonce: 0,
    };
    const contractAddress = ethers.getCreateAddress(transaction);
    console.log("Calculated Contract Address:", contractAddress);
  });

  it.skip("Step 2 -  Call DeployerDeployer.deploy()", async function () {
    const { deployerDeployer } = await loadFixture(setup);
    const tx = await deployerDeployer.deploy();
    console.log("txHash", tx.hash);
    const events = await deployerDeployer.queryFilter("Log");
    console.log("Deployer address", events[events.length - 1].args[0]);
    console.log("Block number", await ethers.provider.getBlockNumber());

    // try to deploy a same contract address - expecting to fail
    const tx2 = await deployerDeployer.deploy();
  });

  it.skip("Step 2.1 -  Call DeployerDeployer.deploy(), self destruct, then deploy a same address again, expecting to success", async function () {
    const { deployerDeployer } = await loadFixture(setup);
    const tx = await deployerDeployer.deploy();

    console.log("txHash", tx.hash);
    const events = await deployerDeployer.queryFilter("Log");

    const deployerAddress = events[events.length - 1].args[0];
    const deployerEOA = (await ethers.getSigners())[0];
    console.log("Deployer address", deployerAddress);
    console.log("Block number", await ethers.provider.getBlockNumber());

    // self destruct
    const deployerContract = new ethers.Contract(
      deployerAddress,
      ["function kill()"],
      deployerEOA
    );

    const txSelfDestruct = await deployerContract.kill();
    //await deployerContract.kill();
    // try to deploy a same contract address - expecting to fail
    //const tx2 = await deployerDeployer.deploy();
  });

  it("Test 2.1 deploy deployer by EOA, call kill twice", async function () {
    ///
    const deployerByEOA = await ethers.deployContract("Deployer", {
      value: 1000,
    });
    console.log("deployerByEOA address", await deployerByEOA.getAddress());

    await deployerByEOA.kill();

    console.log(
      "account0 balance",
      await ethers.provider.getBalance(
        "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
      )
    );

    await deployerByEOA.kill();
  });
});
