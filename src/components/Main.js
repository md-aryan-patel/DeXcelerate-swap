import React from "react";
import Landing from "./Landing";
import Details from "./Details";

function Main() {
  return (
    <div>
      <div className="bg-[#0f1013] w-full overflow-hidden m-0 p-0">
        <Landing />
        <Details />
      </div>
    </div>
  );
}

export default Main;
