import React, { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import astro from "../assets/astro.png";

function ErrorPage() {
  const { changeNetwork } = useContext(ApplicationContext);
  return (
    <div className=" bg-[#131a2a] w-screen h-screen flex flex-row">
      <div className=" flex w-1/2 items-center justify-center flex-col">
        <div className="text-white font-poppins text-3xl px-20 font-semibold">
          Oop's
        </div>
        <div className="text-white font-poppins mt-3 text-md font-light">
          It seems like you are on wrong chain.
        </div>
        <div className="text-white font-poppins text-md font-light">
          This swap only works on sepolia network :)
        </div>
        <button
          onClick={() => changeNetwork(11155111)}
          className="px-10 rounded-lg bg-blue-600 hover:bg-blue-500 hover:text-white cursor-pointer w-1/3 py-3 items-center justify-center mt-4 text-slate-200 font-bold"
        >
          Change chain
        </button>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <img src={astro} className="w-1/2 h-1/2" />
      </div>
    </div>
  );
}

export default ErrorPage;
