import React, { useContext, useRef, useState } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import Loader from "./Loader";

function CreatePair() {
  const { createPair } = useContext(ApplicationContext);
  const [firstToken, setFirstToken] = useState("");
  const [secondToken, setSecondToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token1 = useRef();
  const token2 = useRef();

  const setToken1 = (e) => {
    e.preventDefault();
    setFirstToken(token1.current.value);
  };
  const setToken2 = (e) => {
    e.preventDefault();
    setSecondToken(token2.current.value);
  };

  const addPair = async () => {
    const prefix1 = firstToken[0] + firstToken[1];
    const prefix2 = secondToken[0] + secondToken[1];

    if (firstToken.length !== 42 || secondToken.length !== 42)
      return alert("Invalid token address");
    else if (prefix1 !== "0x" || prefix2 !== "0x")
      return alert("Invalid token address");
    if (firstToken === secondToken) return alert("Both tokens are same");
    setIsLoading(true);
    const result = await createPair(firstToken, secondToken);
    token1.current.value = "";
    token2.current.value = "";
    setIsLoading(false);
    return alert("Pair created successfully");
  };

  return (
    <div className="flex w-screen flex-col bg-[#131a2a] h-screen justify-center items-center">
      <div className="w-1/3 flex rounded-xl bg-[#191919] p-4 border border-slate-600">
        <input
          type="string"
          ref={token1}
          onChange={setToken1}
          placeholder="Token address"
          className="border-none bg-transparent w-full placeholder:text-2xl font-bold text-white text-2xl p-2 m-1 rounded-md focus:outline-none focus:ring-0"
        ></input>
      </div>

      <div className="w-1/3 flex flex-col rounded-xl bg-[#191919] p-4 my-4 border border-slate-600">
        <input
          type="string"
          ref={token2}
          onChange={setToken2}
          placeholder="Token address"
          className="border-none bg-transparent w-full placeholder:text-2xl font-bold text-white text-2xl p-2 m-1 rounded-md focus:outline-none focus:ring-0"
        ></input>
      </div>
      <button
        onClick={addPair}
        className="w-1/3 bg-blue-500 text-slate-100 p-3 my-4 rounded-3xl hover:bg-blue-600 hover:text-stone-50 font-semibold text-base"
      >
        Add Pair
      </button>
      {isLoading ? <Loader /> : <></>}
    </div>
  );
}

export default CreatePair;
