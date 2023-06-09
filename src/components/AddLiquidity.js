import React, { useState, useContext, useEffect, useRef } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { ApplicationContext } from "../context/ApplicationContext";
import Loader from "./Loader";
import { swapMessage } from "../constants";
import cloud from "../assets/cloud.jpg";
import env from "../utils/constants";

function AddLiquidity() {
  const [isOpen, setIsOpen] = useState(false);
  const [option1, setOption1] = useState("No token selected");
  const [option2, setOption2] = useState("No token selected");
  const [token1Balance, setToken1Balance] = useState(0);
  const [token2Balance, setToken2Balance] = useState(0);
  const [currentPair, setCurrentPair] = useState({});
  const [allPairs, setAllPairs] = useState([]);
  const [loadin, setLoading] = useState(false);
  const [lPBalance, setLPBalance] = useState(0);

  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  const inputRef1 = useRef();
  const inputRef2 = useRef();

  const {
    fetchAllPairs,
    fetchBalance,
    _addLiquidity,
    getLpBalance,
    addLiquidityEth,
  } = useContext(ApplicationContext);

  useEffect(() => {
    pair();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const addEthLiquidity = async () => {
    if (currentPair.token0 === env.WETH) {
      try {
        const res = await addLiquidityEth(currentPair.token1, value2, value1);
        if (res === -1) {
          setVariables("Unablet to add liquidity");
          return;
        }
        setVariables("Transaction successfull");
        return;
      } catch (err) {
        console.log(err);
        setVariables("Some error occurred");
        return;
      }
    } else if (currentPair.token1 == env.WETH) {
      try {
        const res = await addLiquidityEth(currentPair.token0, value1, value2);
        if (res === -1) {
          setVariables("Unablet to add liquidity");
          return;
        }
        setVariables("Transaction successfull");
        return;
      } catch (err) {
        console.log(err);
        setVariables("Some error occurred");
        return;
      }
    }
  };

  const addLiquidity = async () => {
    if (
      option1 === "No token selected" ||
      option2 === "No token selected" ||
      value1 === "0" ||
      value2 === "0"
    )
      return alert("Can't procede transaction with current values");

    if (currentPair.token0 === env.WETH || currentPair.token1 === env.WETH) {
      setLoading(true);
      addEthLiquidity();
      return;
    }

    if (parseInt(value1) > token1Balance || parseInt(value2) > token2Balance)
      return alert("Insufficient Balance");
    try {
      setLoading(true);
      const status = await _addLiquidity(
        currentPair.token0,
        currentPair.token1,
        value1,
        value2
      );
      setVariables("Transaction successfull");
      return;
    } catch (err) {
      console.log(err);
      setVariables("Some error occurred");
      return;
    }
  };

  const setVariables = async (_message) => {
    setLoading(false);
    inputRef1.current.value = "";
    inputRef2.current.value = "";
    const [balance0, balance1] = await fetchBalance(
      currentPair.token0,
      currentPair.token1
    );
    setLPBalance(await getLpBalance(currentPair.pair));
    setToken1Balance(balance0);
    setToken2Balance(balance1);
    if (_message !== "") return alert(_message);
  };

  const setupFunction = async (_item) => {
    setCurrentPair(await _item);
    setOption1(await _item.name0);
    setOption2(await _item.name1);
    setIsOpen(false);
    const [balance0, balance1] = await fetchBalance(_item.token0, _item.token1);
    setToken1Balance(balance0);
    setToken2Balance(balance1);

    setLPBalance(await getLpBalance(_item.pair));
  };

  const pair = async () => {
    const data = await fetchAllPairs();
    setAllPairs(data);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${cloud})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex w-screen flex-col bg-[#131a2a] h-screen justify-center items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b bg-primary opacity-60"></div>
      <Modal
        isOpen={isOpen}
        onRequestClose={togglePopup}
        className="flex justify-center items-center w-1/3 h-[80%] content-center bg-gradient-to-b from-slate-600 to-slate-900 rounded-2xl p-2"
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(1px)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
          },
        }}
      >
        <div className="flex w-full h-full flex-col">
          <div className="flex flex-row w-full h-fit text-white text-sm font-semibold justify-between p-1 m-1 cursor-pointer">
            <div>Select token</div>
            <AiOutlineClose
              className="text-lg"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
          <div className="flex overflow-auto rounded-lg border border-slate-400 h-full w-full flex-col">
            {allPairs.map((item, i) => (
              <div
                key={i}
                onClick={() => setupFunction(item)}
                className="flex p-2 my-2 w-full h-fit cursor-pointer border-b text-white font-semibold font-poppins"
              >
                {item.name0}-{item.name1}
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <div className="fle z-50 flex-col w-[35%] rounded-xl bg-[#111524] p-4">
        <button
          onClick={togglePopup}
          className="flex w-full mb-1 p-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 saturate-[2] hover:from-indigo-400/10 hover:to-purple-400/10 rounded-lg cursor-pointer justify-center items-center font-semibold text-lg text-white"
        >
          Select token pair
        </button>
        <div className="flex flex-col w-full h-fit justify-between rounded-2xl border border-slate-600 p-2">
          <div className=" flex flex-row">
            <input
              type="number"
              min={0}
              ref={inputRef1}
              onChange={() => setValue1(inputRef1.current.value)}
              placeholder={0}
              className=" border-none bg-transparent w-1/2 placeholder:text-2xl font-bold text-white text-2xl p-2 m-1 rounded-md focus:outline-none focus:ring-0"
            />
            <div className="flex font-semibold cursor-pointer w-1/2 justify-center items-center text-slate-100 text-base p-2 m-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 saturate-[2] hover:from-indigo-400/10 hover:to-purple-400/10">
              {option1}
            </div>
          </div>
          <div className="p-1 ms-2 text-white font-bold text-sm">
            Balance: {token1Balance}
          </div>
        </div>

        <div className=" flex flex-col w-full h-fit justify-between rounded-2xl border border-slate-600 p-2 my-1">
          <div className=" flex flex-row">
            <input
              type="number"
              ref={inputRef2}
              onChange={() => setValue2(inputRef2.current.value)}
              min={0}
              placeholder={0}
              className=" border-none bg-transparent w-1/2 placeholder:text-2xl font-bold text-white text-2xl p-2 m-1 rounded-md focus:outline-none focus:ring-0"
            />
            <div className="flex font-semibold cursor-pointer w-1/2 justify-center items-center text-slate-100 text-base p-2 m-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 saturate-[2] hover:from-indigo-400/10 hover:to-purple-400/10">
              {option2}
            </div>
          </div>
          <div className="p-1 ms-2 text-white font-bold text-sm">
            Balance: {token2Balance}
          </div>
        </div>
        <button
          onClick={addLiquidity}
          className="flex w-full mt-2 p-3 bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 justify-center items-center font-semibold text-lg text-white"
        >
          Add Liquidity
        </button>
        <div className="flex w-full h-fit flex-row justify-between border border-slate-600 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 saturate-[2] hover:from-indigo-400/10 hover:to-purple-400/10 p-2 my-2 rounded-lg">
          <div className="text-white text-sm font-semibold font-poppins">
            LP-balance {currentPair.name0} - {currentPair.name1} :
          </div>
          <div
            className={`text-sm font-semibold font-poppins ${
              lPBalance === 0
                ? "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                : "text-white"
            }`}
          >
            {lPBalance !== 0 && <span>{lPBalance}</span>}
          </div>
        </div>
      </div>
      {loadin ? <Loader message={swapMessage} /> : <></>}
    </div>
  );
}

export default AddLiquidity;
