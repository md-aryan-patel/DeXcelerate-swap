import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import database from "../firebase/firebasedb";
import factoryAbi from "../backend/artifacts/src/backend/contracts/DeXcelFactory.sol/DeXcelFactory.json";
import routerAbi from "../backend/artifacts/src/backend/contracts/DeXcelRouter.sol/DeXcelRouter.json";
import pairAbi from "../backend/artifacts/src/backend/contracts/DeXcelPair.sol/DeXcelPair.json";
import erc20 from "../backend/artifacts/src/backend/contracts/interfaces/IERC20.sol/IERC20.json";
import env from "../utils/constants";
import { ADD_LIQUIDITY, CREATE_PAIR, SWAP } from "../constants";

const toWei = (num) => ethers.utils.parseEther(num.toString());
const toEth = (num) => ethers.utils.formatEther(num);

export const ApplicationContext = createContext();

const { ethereum } = window;

export const ApplicationProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentChain, setCurrentChain] = useState("");

  let factoryContract, signer, routerContract, pairContract;

  useEffect(() => {
    checIfWalletIsConnected();
  }, []);

  const setChain = async () => {
    setCurrentChain(await ethereum.networkVersion);
  };

  setChain();

  ethereum.on("accountsChanged", () => {
    window.location.reload();
    connectWallet();
    handleContract();
  });

  ethereum.on("networkChanged", () => {
    window.location.reload();
    setCurrentChain(ethereum.networkVersion);
  });

  const handleContract = async () => {
    const currentProvider = new ethers.providers.Web3Provider(ethereum);
    await currentProvider.send("eth_requestAccounts", []);
    signer = currentProvider.getSigner();
    factoryContract = new ethers.Contract(env.factory, factoryAbi.abi, signer);
    routerContract = new ethers.Contract(env.router, routerAbi.abi, signer);
  };

  const getLpBalance = async (_pairAddress) => {
    pairContract = new ethers.Contract(_pairAddress, pairAbi.abi, signer);
    const balance = await pairContract.balanceOf(currentAccount);
    return formatNumber(toEth(balance));
  };

  const checIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Install Metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleContract();

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object");
    }
  };

  const createPair = async (_token0, _token1) => {
    try {
      const result = await factoryContract.createPair(_token0, _token1);
      const receipt = await result.wait();
      const events = receipt.events;
      const event = events[0];
      database.pushPair(
        event.args.token0,
        event.args.name0,
        event.args.token1,
        event.args.name1,
        event.args.pair
      );
      database.pushTransaction(currentAccount, result.hash, CREATE_PAIR);
      return receipt.status;
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  const fetchAllPairs = async () => {
    try {
      const data = await database.fetchAllPairs();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const formatNumber = (number) => {
    return Math.floor(number * 100) / 100;
  };

  const fetchBalance = async (_token0, _token1) => {
    console.log(`Token0: ${_token0}, Token1: ${_token1}`);
    const token0 = new ethers.Contract(_token0, erc20.abi, signer);
    const token1 = new ethers.Contract(_token1, erc20.abi, signer);
    try {
      console.log(await token0.name());
      let balance0 = await token0.balanceOf(currentAccount);
      let balance1 = await token1.balanceOf(currentAccount);
      balance0 = formatNumber(toEth(balance0));
      balance1 = formatNumber(toEth(balance1));
      return [balance0, balance1];
    } catch (err) {
      console.log(err);
      return [0, 0];
    }
  };

  const _addLiquidity = async (_token0, _token1, _amount0, _amount1) => {
    const token0 = new ethers.Contract(_token0, erc20.abi, signer);
    const token1 = new ethers.Contract(_token1, erc20.abi, signer);
    const receipt1 = await token0.approve(env.router, toWei(_amount0));
    await receipt1.wait();
    const receipt2 = await token1.approve(env.router, toWei(_amount1));
    await receipt2.wait();
    const data = Math.floor(Date.now() / 1000) + 3600;
    try {
      const result = await routerContract.addLiquidity(
        _token0,
        _token1,
        toWei(_amount0),
        toWei(_amount1),
        0,
        0,
        currentAccount,
        data
      );
      const status = await result.wait();
      database.pushTransaction(currentAccount, result.hash, ADD_LIQUIDITY);
      return status;
    } catch (err) {
      console.log(err);
    }
  };

  const addLiquidityEth = async (_token, _tokenAmount, _etherAmount) => {
    const token = new ethers.Contract(_token, erc20.abi, signer);
    const receipt = await token.approve(env.router, toWei(_tokenAmount));
    await receipt.wait();
    const date = Math.floor(Date.now() / 1000) + 3600;
    try {
      const receipt = await routerContract.addLiquidityETH(
        _token,
        toWei(_tokenAmount),
        toWei(_tokenAmount),
        toWei(_etherAmount),
        currentAccount,
        date,
        { value: toWei(_etherAmount) }
      );
      database.pushTransaction(currentAccount, receipt.hash, ADD_LIQUIDITY);
      await receipt.wait();
      return receipt.hash;
    } catch (err) {
      console.log(err);
      return -1;
    }
  };

  const swapWithEth = async (_token, _tokenOut, _ethAmount) => {
    const date = Math.floor(Date.now() / 1000) + 3600;
    try {
      const result = await routerContract.swapETHForExactTokens(
        toWei(_tokenOut),
        [env.WETH, _token],
        currentAccount,
        date,
        { value: toWei(_ethAmount) }
      );
      database.pushTransaction(currentAccount, result.hash, SWAP);
      await result.wait();
      return result.hash;
    } catch (err) {
      console.log(err);
      return -1;
    }
  };

  const swapTokens = async (_token0, _token1, _amount0) => {
    const token0 = new ethers.Contract(_token0, erc20.abi, signer);
    const receipt1 = await token0.approve(env.router, toWei(_amount0));
    await receipt1.wait();
    const data = Math.floor(Date.now() / 1000) + 3600;
    try {
      const receipt = await routerContract.swapExactTokensForTokens(
        toWei(_amount0),
        0,
        [_token0, _token1],
        currentAccount,
        data
      );
      database.pushTransaction(currentAccount, receipt.hash, SWAP);
      console.log(receipt.hash);
      await receipt.wait();
      return receipt.hash;
    } catch (err) {
      console.log(`Application context error: ${err}`);
    }
  };

  const changeNetwork = async (chainId) => {
    if (!ethereum) return alert("Install Metamask");
    if (ethereum.networkVersion === chainId.toString()) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexlify(chainId) }],
      });
      // window.location.reload();
      return 1;
    } catch (error) {
      if (error.code === 4902) {
        console.log("User rejected network switch");
      } else {
        console.error("Error occurred while switching network:", error);
      }
      return 0;
    }
  };

  const getTokenName = async (_tokenAddress) => {
    try {
      console.log(_tokenAddress);
      const token0 = new ethers.Contract(_tokenAddress, erc20.abi, signer);
      const result = await token0.name();
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        currentChain,
        currentAccount,
        connectWallet,
        createPair,
        fetchAllPairs,
        fetchBalance,
        _addLiquidity,
        getLpBalance,
        swapTokens,
        changeNetwork,
        getTokenName,
        addLiquidityEth,
        swapWithEth,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
