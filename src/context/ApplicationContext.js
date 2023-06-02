import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import database from "../firebase/firebasedb";
import factoryAbi from "../backend/artifacts/src/backend/contracts/DeXcelFactory.sol/DeXcelFactory.json";
import env from "../utils/constants";

export const ApplicationContext = createContext();

const { ethereum } = window;

export const ApplicationProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  let factoryContract;

  useEffect(() => {
    checIfWalletIsConnected();
  }, []);

  ethereum.on("accountsChanged", () => {
    connectWallet();
    handleContract();
  });

  const handleContract = async () => {
    const currentProvider = new ethers.providers.Web3Provider(ethereum);
    await currentProvider.send("eth_requestAccounts", []);
    const signer = currentProvider.getSigner();
    factoryContract = new ethers.Contract(env.factory, factoryAbi.abi, signer);
    console.log("created contract...");
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
      database.pushPair(event.args.token0, event.args.token1, event.args.pair);
      return receipt.status;
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  return (
    <ApplicationContext.Provider
      value={{ currentAccount, connectWallet, createPair }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
