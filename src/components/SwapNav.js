import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../context/ApplicationContext";

function Navbar() {
  const navigate = useNavigate();
  const { currentAccount, connectWallet } = useContext(ApplicationContext);

  console.log(currentAccount);

  const truncateHex = (hex) => {
    const prefix = hex.slice(0, 2);
    const body = hex.slice(2, 4);
    const suffix = hex.slice(-3);

    return `${prefix}${body}...${suffix}`;
  };

  return (
    <>
      <nav className="flex fixed bg-[#131a2a] z-50 w-full h-fit justify-between items-center py-4 navbar backdrop-filter backdrop-blur-lg border-b-[1px] border-slate-600">
        <div
          onClick={() => navigate("/#home")}
          className="flex w-fit flex-row ml-10 cursor-pointer select-none"
        >
          <h3 className=" flex items-center justify-center ps-2 font-bold text-xl font-poppins bg-clip-text text-transparent bg-gradient-to-r from-[#4e54c8] to-[#8f94fb]">
            DeXcelerate
          </h3>
        </div>
        <div className="flex flex-row">
          <button
            onClick={() => navigate("/createpair")}
            className="text-slate-300 font-poppins text-sm font-semibold hover:text-slate-100 ml-10"
          >
            Create Pair
          </button>
          <button
            onClick={() => navigate("/liquidity")}
            className="text-slate-300 font-poppins text-sm font-semibold hover:text-slate-100 ml-10"
          >
            Add liquidity
          </button>
          <button
            onClick={() => navigate("/swap")}
            className="text-slate-300 font-poppins text-sm font-semibold hover:text-slate-100 ml-10 mr-5"
          >
            Swap tokens
          </button>
          <button
            onClick={connectWallet}
            className="text-white font-poppins p-2 w-[160px] ml-5 mr-10 rounded-lg bg-gradient-to-r from-[#667db6] via-[#0082c8] to-[#667db6] hover:from-[#7590d3] hover:via-[#0095e4] hover:to-[#708bcd]"
          >
            <div>
              {currentAccount !== "" ? (
                truncateHex(currentAccount)
              ) : (
                <>Connect Wallet</>
              )}
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
