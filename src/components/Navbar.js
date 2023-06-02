import React, { useContext, useState } from "react";
import { navLinks } from "../constants";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <nav className="flex fixed bg-primary z-50 w-full h-fit justify-between items-center py-4 navbar backdrop-filter backdrop-blur-lg bg-opacity-40">
        <div
          onClick={() => navigate("/#home")}
          className="flex w-fit flex-row ml-10 cursor-pointer select-none"
        >
          <h3 className=" flex items-center justify-center ps-2 font-bold text-xl font-poppins bg-clip-text text-transparent bg-gradient-to-r from-[#4e54c8] to-[#8f94fb]">
            DeXcelerate
          </h3>
        </div>
        <div className="flex flex-row">
          <ul className="list-none sm:flex flex-1 hidden justify-end items-center">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] text-slate-200 hover:text-white ${
                  index === nav.length - 1 ? "mr-0" : "mr-10"
                } `}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate("/swap")}
            className="text-white font-poppins p-2 w-[130px] ml-5 mr-10 rounded-lg bg-gradient-to-r from-[#667db6] via-[#0082c8] to-[#667db6] hover:from-[#7590d3] hover:via-[#0095e4] hover:to-[#708bcd]"
          >
            Launch app
          </button>
        </div>

        <div className="flex flex-1 sm:hidden justify-end items-center">
          <div
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle((prev) => !prev)}
          >
            {toggle ? (
              <IoMdClose className="text-white" />
            ) : (
              <HiOutlineMenuAlt2 className="text-white" />
            )}
          </div>
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 rounded-xl sidebar min-w-[140px]`}
          >
            <ul className="list-none flex flex-1 flex-col justify-end items-center">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${
                    index === nav.length - 1 ? "mb-0" : "mb-4"
                  } `}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
