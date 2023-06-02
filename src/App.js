import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SwapNav from "./components/SwapNav";
import { Route, Routes, useLocation } from "react-router-dom";
import Swap from "./components/Swap";
import CreatePair from "./components/CreatePair";
import AddLiquidity from "./components/AddLiquidity";

function App() {
  const location = useLocation();

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
          <Route path="/swap" element={<Swap />} />
          <Route path="/createpair" element={<CreatePair />} />
          <Route path="/liquidity" element={<AddLiquidity />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
