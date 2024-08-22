import React from "react";
import { twMerge } from "tailwind-merge";

export default function Button({ className, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        ` p-2 text-xl border-2 border-black w-full active:scale-95 rounded-md  bg-gray-600 hover:bg-gray-300 hover:text-gray-800 `,
        className
      )}
    >
      {children}
    </button>
  );
}
