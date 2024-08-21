import React from "react";

export default function Tooltip({ isShowing = false, children }) {
  return (
    <>
      {isShowing && (
        <span className=" absolute text-center bg-red-200/20 text-white text-sm rounded py-2 px-3 min-w-80 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap  z-10">
          {children}
        </span>
      )}
    </>
  );
}
