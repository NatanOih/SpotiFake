import React from "react";
import Headline from "./Headline";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAtom } from "jotai";
import { darkModeStorage } from "../lib/store";
import { HeartIcon } from "./HeartIcon";
import { DarkIcon } from "./Dark";
import { LightIcon } from "./Light";

export default function Nav2() {
  const [darkMode, setDarkMode] = useAtom(darkModeStorage);
  const ButtonBg = !darkMode ? "bg-red-200/20" : "bg-red-700/20";
  const NavBg = !darkMode ? "bg-red-600/80" : "bg-red-200/30";

  return (
    <nav
      className={`${NavBg} p-2 z-50 px-10 sticky top-0 max-w-screen overflow-hidden flex flex-row sm:justify-between justify-center items-center `}
    >
      <Headline className=" xl:text-4xl lg:text-3xl md:text-xl sm:text-lg hidden sm:inline-block  text-nowrap">
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
