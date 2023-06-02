require("@nomicfoundation/hardhat-toolbox");
const env = require("./src/utils/constants");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  defaultNetwork: "default",

  networks: {
    // default: {
    //   url: "http://127.0.0.1:7545",
    // },
    default: {
      url: env.sepolia_network,
      accounts: [env.admin_private_key],
    },
  },

  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test",
  },
};
