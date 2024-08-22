import { useAtomValue } from "jotai";
import React from "react";
import { darkModeStorage } from "../lib/store";

export default function Tooltip({ isShowing = false, children }) {
  const darkMode = useAtomValue(darkModeStorage);
  return (
    <>
      {isShowing && (
        <span
          className={` absolute text-center bg-red-200/20 font-bold text-white text-sm rounded py-2 px-3 min-w-80 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap  ${
            !darkMode && "bg-red-700/70 text-black/85 "
          }  z-10`}
        >
          {children}
        </span>
      )}
    </>
  );
}
