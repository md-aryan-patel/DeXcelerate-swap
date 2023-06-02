import React from "react";
import { BsArrowRight } from "react-icons/bs";
import crypto from "../assets/crypto.jpg";
import { useNavigate } from "react-router-dom";

function Details() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#0f1013] to-primary mt-0">
      <div className="flex sm:flex-row justify-between items-center w-full flex-col text-[#e8e6e3] mb-10 mt-28">
        <div className="flex flex-col w-1/4">
          <div className="font-bold text-5xl flex items-center justify-center">
            $1.4T+
          </div>
          <div className="font-semibold text-sm flex items-center justify-center mt-3">
            Trade volume
          </div>
        </div>

        <div className="flex flex-col w-1/4">
          <div className="font-bold text-5xl flex items-center justify-center">
            151M+
          </div>
          <div className="font-semibold text-sm flex items-center justify-center mt-3">
            All Time Trade
          </div>
        </div>

        <div className="flex flex-col ml-14 w-1/4">
          <div className="font-bold text-5xl flex items-center justify-center">
            300+
          </div>
          <div className="font-semibold text-sm flex items-center justify-center mt-3">
            Intigrations
          </div>
        </div>

        <div className="flex flex-col ml-14 w-1/4">
          <div className="font-bold text-5xl flex items-center justify-center">
            4,400+
          </div>
          <div className="font-semibold text-sm flex items-center justify-center mt-3">
            Community Delegates
          </div>
        </div>
      </div>
      <div className="flex w-full h-fit justify-between items-center font-poppins text-white mx-16 mt-32 mb-20">
        <div className="whitespace-normal overflow-auto w-1/3">
          <div
            className="flex flex-row hover:text-slate-300 cursor-pointer"
            onClick={() => navigate("/swap")}
          >
            <div className="text-base font-bold mr-5">Launch Application</div>
            <BsArrowRight className=" justify-center items-center text-2xl" />
          </div>
          <div className="text-3xl mt-5 text-white font-semibold">
            A growing network of DeFi Apps.
          </div>
          <div className="text-xl font-light text-slate-300 mt-3">
            Developers, traders, and liquidity providers participate together in
            a financial marketplace that is open and accessible to all.
          </div>
        </div>

        <div className="w-1/3 rounded-lg whitespace-normal overflow-auto border-[2px] border-[#333536]">
          <img
            src={crypto}
            className="rounded-lg bg-contain bg-center bg-no-repeat"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Details;
