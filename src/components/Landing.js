import React from "react";
import bgimg from "../assets/pxfuel.jpg";

function Landing() {
  const mainStyle = {
    backgroundImage: `url(${bgimg})`,
  };

  return (
    <div
      id="home"
      className="flex md:flex-row flex-col bg-contain bg-center bg-no-repeat h-screen"
      style={mainStyle}
    >
      <div className="flex w-full h-full justify-start items-end content-end relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#636976] via-[#191b1f] to-[#191b1f] opacity-60"></div>
        <div className="text-[#e8e6e3] ml-10 mb-4 font-poppins relative z-10">
          <div className="flex flex-row font-normal w-fit text-base py-2 px-2 rounded-[10px] bg-gray-gradient mb-2">
            Inspired by Uniswap V2 Protocol
          </div>
          <div className="text-7xl font-thin mb-4">
            <span className="bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] bg-clip-text text-transparent font-semibold">
              DeXcelerate
            </span>{" "}
            Swap
          </div>
          <div className="font-poppins text-lg font-semibold mb-2 flex-wrap">
            Experience swift and seamless trading executions,
            <br />
            Benefit from our robust liquidity pools.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
