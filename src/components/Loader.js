import React from "react";
import { ScaleLoader } from "react-spinners";
const Loader = () => {
  const style = {
    box: "flex h-32 w-48 items-center justify-center content-center ",
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className="flex items-center justify-center content-center w-screen h-screen absolute z-20 bg-transparent backdrop-blur-sm">
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
      </div>
    </div>
  );
};

export default Loader;
