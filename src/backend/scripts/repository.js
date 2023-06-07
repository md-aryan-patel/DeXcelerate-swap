const hre = require("hardhat");
const toWei = (num) => hre.ethers.utils.parseEther(num.toString());
require("dotenv").config();
const genAbi = require("../artifacts/src/backend/contracts/initGenerator.sol/InitCodeHashGenerator.json");

const provider = new hre.ethers.providers.JsonRpcProvider(
  process.env.sepolia_network
);
const wallet = new hre.ethers.Wallet(process.env.admin_private_key, provider);
const generatorContract = new hre.ethers.Contract(
  process.env.generator,
  genAbi.abi,
  provider
);

const generateHash = async () => {
  const result = await generatorContract.connect(wallet).getInitCodeHash();
  console.log(result);
};

generateHash();
