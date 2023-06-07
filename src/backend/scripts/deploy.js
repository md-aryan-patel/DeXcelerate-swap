const hre = require("hardhat");
const toWei = (num) => hre.ethers.utils.parseEther(num.toString());
require("dotenv").config();

const main = async () => {
  /*________________________________________________________________ /
  const Factory = await hre.ethers.getContractFactory("DeXcelFactory");
  const factory = await Factory.deploy(process.env.admin_address);
  await factory.deployed();

  console.log(`Factory deployed to: ${factory.address}`);

  const Router = await hre.ethers.getContractFactory("DeXcelRouter");
  const router = await Router.deploy(factory.address, process.env.WETH);
  await router.deployed();

  console.log(`Router deployed to: ${router.address}`);

  const Handler = await hre.ethers.getContractFactory("Handler");
  const handler = await Handler.deploy(process.env.factory, process.env.router);
  await handler.deployed();

  console.log(`Handler deployed to: ${handler.address}`);
  /*________________________________________________________________*/

  const InitGenerator = await hre.ethers.getContractFactory(
    "InitCodeHashGenerator"
  );
  const generator = await InitGenerator.deploy();
  await generator.deployed();

  console.log(`Generator deployed to: ${generator.address}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
