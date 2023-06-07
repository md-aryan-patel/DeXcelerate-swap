import React, { useContext, useEffect } from "react";
import { ApplicationContext } from "./context/ApplicationContext";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SwapNav from "./components/SwapNav";
import { Route, Routes, useLocation } from "react-router-dom";
import Swap from "./components/Swap";
import CreatePair from "./components/CreatePair";
import AddLiquidity from "./components/AddLiquidity";
import ErrorPage from "./components/ErrorPage";

function App() {
  const location = useLocation();
  const { currentChain } = useContext(ApplicationContext);
  useEffect(() => {
    console.log(currentChain);
  }, [currentChain]);

  const isSwapOrLiquidityRoute =
    location.pathname === "/swap" ||
    location.pathname === "/createpair" ||
    location.pathname === "/liquidity";

  const shouldShowErrorPage =
    currentChain !== "11155111" && isSwapOrLiquidityRoute;

  return (
    <>
      <div className="bg-[#0f1013] w-full overflow-hidden m-0 p-0">
        {location.pathname === "/" || location.pathname === "/#home" ? (
          <Navbar />
        ) : (
          <SwapNav />
        )}
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        {shouldShowErrorPage ? (
          <ErrorPage />
        ) : (
          <Routes>
            <Route path="/swap" element={<Swap />} />
            <Route path="/createpair" element={<CreatePair />} />
            <Route path="/liquidity" element={<AddLiquidity />} />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
