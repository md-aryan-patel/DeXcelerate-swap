import React, { useState } from "react";

function AddLiquidity() {
  const [option1, setOption1] = useState("Ether");
  const [option2, setOption2] = useState("Polygon");
  return (
    <div className="flex w-screen flex-col bg-[#131a2a] h-screen justify-center items-center">
      <div className="fle flex-col w-[35%] rounded-xl bg-[#111524] p-4">
        <button className="flex w-full mb-1 p-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 saturate-[2] hover:from-indigo-400/10 hover:to-purple-400/10 rounded-lg cursor-pointer justify-center items-center font-semibold text-lg text-white">
          Select token pair
        </button>
        <div className=" flex flex-row w-full h-fit justify-between rounded-2xl border border-slate-600 p-5">
          <input
            type="number"
            min={0}
            placeholder={0}
            className=" border-none bg-transparent w-1/2 placeholder:text-2xl font-bold text-white text-2xl p-2 m-1 rounded-md focus:outline-none focus:ring-0"
          />
          <div className="flex font-semibold cursor-pointer w-1/2 justify-center items-center text-slate-100 text-base p-2 m-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 saturate-[2] hover:from-indigo-400/10 hover:to-purple-400/10">
            {option1}
          </div>
        </div>

        <div className=" flex flex-row w-full h-fit justify-between rounded-2xl border border-slate-600 p-5 my-1">
          <input
            type="number"
            min={0}
            placeholder={0}
            className=" border-none bg-transparent w-1/2 placeholder:text-2xl font-bold text-white text-2xl p-2 m-1 rounded-md focus:outline-none focus:ring-0"
          />
          <div className="flex font-semibold cursor-pointer w-1/2 justify-center items-center text-slate-100 text-base p-2 m-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 saturate-[2] hover:from-indigo-400/10 hover:to-purple-400/10">
            {option2}
          </div>
        </div>
        <button className="flex w-full mt-2 p-3 bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 justify-center items-center font-semibold text-lg text-white">
          Add Liquidity
        </button>
      </div>
    </div>
  );
}

export default AddLiquidity;
