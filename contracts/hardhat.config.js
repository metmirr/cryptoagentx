require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-ignition-ethers");

const { task } = require("hardhat/config");

const ELECTRONEUM_RPC_URL = process.env.ELECTRONEUM_RPC_URL;
const ELECTRONEUM_PRIVATE_KEY = process.env.ELECTRONEUM_PRIVATE_KEY;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  const balance = await hre.ethers.provider.getBalance(accounts[0].address);
  console.log(balance);

  for (const account of accounts) {
    console.log(account.address);
  }
});

const AGENT_ADDRESS = process.env.AGENT_ADDRESS;
const MOCK_USDC_ADDRESS = process.env.MOCK_USDC_ADDRESS;

task("fund-agent", "Funds the agent", async (taskArgs, hre) => {
  const [owner] = await hre.ethers.getSigners();
  const amount = hre.ethers.parseUnits("1000", 6); // 1000 USDC

  const usdc = await hre.ethers.getContractAt("MockUSDC", MOCK_USDC_ADDRESS, owner);
  const tx = await usdc.transfer(AGENT_ADDRESS, amount);
  await tx.wait();
  console.log(`Transferred ${amount} USDC to ${AGENT_ADDRESS}`);
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    electroneum: {
      url: ELECTRONEUM_RPC_URL,
      accounts: [ELECTRONEUM_PRIVATE_KEY],
    },
  },
};

