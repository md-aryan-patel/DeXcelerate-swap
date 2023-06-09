import React from "react";
import { ScaleLoader } from "react-spinners";
const Loader = ({ message }) => {
  const style = {
    box: "flex flex-col h-32 w-1/2 items-center justify-center content-center ",
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className="flex items-center justify-center content-center w-screen h-screen absolute z-[9999] bg-transparent backdrop-blur-md">
      <div className={style.box}>
        <ScaleLoader
          color="#2d62ba"
          loading={true}
          cssOverride={override}
          size={200}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="text-lg bg-gradient-to-r from-blue-500/40 to-pink-500/40 bg-clip-text"
        />
        <div className="flex text-base font-poppins w-full font-semibold justify-center content-center">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
            {message}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Loader;
