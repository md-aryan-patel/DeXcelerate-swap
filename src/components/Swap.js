import React, { useRef, useState } from "react";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";

function Swap() {
  const [options, setOptions] = useState("Select Tokens");
  const [secondOption, setSecondOption] = useState("Select Tokens");
  const inputRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [bottomIsOpen, setBottomIsOpen] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(0);

  const setCount = (e) => {
    e.preventDefault();
    setTokenAmount(parseInt(inputRef.current.value));
  };

  return (
    <div className="flex w-screen bg-[#131a2a] h-screen justify-center items-center">
      <div className="flex flex-col w-[35%] rounded-xl bg-[#111524] p-4">
        <div className="flex flex-row w-full h-fit justify-between rounded-2xl border border-slate-600 p-5">
          <input
            type="number"
            ref={inputRef}
            min={0}
            onChange={setCount}
            placeholder={0}
            className="border-none bg-transparent w-1/2 placeholder:text-3xl font-bold text-white text-3xl p-2 m-1 rounded-md focus:outline-none focus:ring-0"
          ></input>
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex flex-row font-semibold cursor-pointer w-1/2 justify-center items-center text-slate-100 select-none text-base p-2 m-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 saturate-[2] hover:from-indigo-400/10 hover:to-purple-400/10"
          >
            {options}
            {isOpen ? (
              <BsCaretUp className="mt-0.5 ms-3" />
            ) : (
              <BsCaretDown className="mt-1 ms-3" />
            )}
          </div>
        </div>

        <div className="flex flex-row w-full h-fit mt-1 justify-between rounded-2xl border border-slate-600 p-5">
          <input
            type="number"
            ref={inputRef}
            min={0}
            placeholder={0}
            className="border-none bg-transparent w-1/2 placeholder:text-3xl font-bold text-white text-3xl p-2 m-1 rounded-md focus:outline-none focus:ring-0"
          ></input>
          <div
            onClick={() => setBottomIsOpen((prev) => !prev)}
            className="flex flex-row font-semibold cursor-pointer w-1/2 justify-center items-center text-slate-100 select-none text-base p-2 m-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 saturate-[2] hover:from-indigo-400/10 hover:to-purple-400/10"
          >
            {secondOption}
            {bottomIsOpen ? (
              <BsCaretUp className="mt-0.5 ms-3" />
            ) : (
              <BsCaretDown className="mt-1 ms-3" />
            )}
          </div>
        </div>
        <button className="flex w-full mt-2 p-3 bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 justify-center items-center font-semibold text-lg text-white">
          Swap
        </button>
      </div>
    </div>
  );
}

export default Swap;
