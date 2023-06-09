import React, { useContext, useEffect, useState } from "react";
import cloud from "../assets/cloud.jpg";
import database from "../firebase/firebasedb";
import { ApplicationContext } from "../context/ApplicationContext";

const MyTransaction = () => {
  const { currentAccount } = useContext(ApplicationContext);
  const [transactionData, setTransactionData] = useState([]);
  const redirectLink = `https://sepolia.etherscan.io/tx/`;

  const getData = async (_currentAccount) => {
    if (_currentAccount !== "") {
      const data = await database.fetchTransaction(_currentAccount);
      setTransactionData(data);
    }
  };

  const truncateHex = (hex) => {
    const prefix = hex.slice(0, 8);
    const body = hex.slice(8, 12);
    const suffix = hex.slice(-12);

    return `${prefix}${body}...${suffix}`;
  };

  useEffect(() => {
    getData(currentAccount);
  }, [currentAccount]);

  return (
    <div
      style={{
        backgroundImage: `url(${cloud})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      onClick={() => console.log(transactionData)}
      className="flex w-screen flex-col bg-[#131a2a] h-screen justify-center items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b bg-primary opacity-60"></div>
      <div className="w-[75%] h-[80%] mt-16 bg-[#1c2c50] rounded-lg flex flex-col">
        <div className="z-50 flex-col">
          <div className="w-full rounded-t-lg border-b border-slate-600 p-2 flex flex-row justify-between">
            <div className=" text-white font-semibold font-poppins flex flex-row">
              <h3 className="px-2">Sr no.</h3>
              <h3 className="px-10">Transaction Hash</h3>
            </div>
            <div className=" text-white font-semibold font-poppins flex flex-row">
              <h3>Date</h3>
              <h3 className="px-[6.5rem]">Type</h3>
            </div>
          </div>
          {transactionData.map((item, i) => (
            <div
              key={i}
              className="w-full rounded-t-lg text-sm p-2 flex flex-row justify-between h-10"
            >
              <div className="text-white font-semibold justify-start font-poppins w-[70%] flex flex-row">
                <h3 className="flex px-6 w-[30px] justify-center items-center">
                  {i + 1}
                </h3>
                <h3 className="mx-12 flex justify-start cursor-pointer underline items-center overflow-hidden w-full">
                  <a href={`${redirectLink}${item.hash}`} target="_blank">
                    {truncateHex(item.hash)}
                  </a>
                </h3>
              </div>
              <div className=" flex flex-row text-white font-semibold w-[70%] items-center ps-56 overflow-hidden font-poppins ">
                <h3 className="flex items-center w-full justify-start overflow-clip h-10">
                  {`${item.date.toDate().getDate().toString()}-${item.date
                    .toDate()
                    .getMonth()
                    .toString()}-${item.date
                    .toDate()
                    .getFullYear()
                    .toString()}`}
                </h3>
                <h3 className="overflow-clip w-full">{item.type}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTransaction;
