import React from "react";
import Headline from "./Headline";
import { Link } from "react-router-dom";
import Button from "./Button";
import { HeartIcon } from "./HeartIcon";
import { DarkIcon } from "./Dark";
import { LightIcon } from "./Light";
import { darkModeStorage } from "../lib/store";
import { useAtom } from "jotai";

export default function Nav() {
  const [darkMode, setDarkMode] = useAtom(darkModeStorage);

  const ButtonBg = !darkMode ? "bg-red-200/20" : "bg-red-700/20";
  const NavBg = !darkMode ? "bg-red-600/80" : "bg-red-200/30";

  return (
    <nav
      className={` md:top-0 z-50 transition-all absolute md:sticky  md:rotate-0 md:right-auto  rotate-90 -right-24 top-[30%] md:h-20 md:max-w-screen md:w-auto w-fit md:m-0 m-2   overflow-hidden flex flex-row md:justify-between justify-center md:px-10 p-2 items-center text-center  md:rounded-none rounded-sm  ${NavBg} `}
    >
      <Headline className=" xl:text-4xl lg:text-3xl md:text-xl text-lg hidden md:inline-block text-nowrap">
        hello /// Welcome to SpotiFake
      </Headline>
      <div className="flex flex-row justify-center items-center  md:gap-10 gap-2">
        <Link to="/favorites">
          <Button
            className={`flex ${ButtonBg} justify-center  md:w-32 md:text-xl text-sm w-fit  gap-2 text-center items-center`}
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              <span> Favorites </span>
              <HeartIcon className={"size-5"} />
            </div>
          </Button>
        </Link>
        <Link to="/">
          <Button
            className={`flex ${ButtonBg} justify-center md:w-32 md:text-xl text-sm w-fit text-nowrap gap-2 text-center items-center`}
          >
            Home ///
          </Button>
        </Link>

        <button
          onClick={() => {
            setDarkMode(!darkMode);
          }}
          className={`flex ${
            darkMode ? "bg-black/30" : "bg-white/60"
          } transition-all rounded-full border border-black p-2 
          
          ${
            !darkMode
              ? "hover:bg-black/30"
              : "hover:bg-white/60 hover:text-black/80"
          }
          
          justify-center  ${
            !darkMode && "text-black/80"
          } text-center items-center`}
        >
          {darkMode ? <DarkIcon /> : <LightIcon />}
        </button>
      </div>
    </nav>
  );
}
