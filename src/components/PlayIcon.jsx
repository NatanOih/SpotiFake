import React from "react";
import { twMerge } from "tailwind-merge";

export const PlayIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={twMerge("size-6", className)}
  >
    <path d="M6.3 3.8c-.9-.5-2.1.1-2.1 1.2v14c0 1.1 1.2 1.7 2.1 1.2l12-7c.8-.5.8-1.9 0-2.4l-12-7Z" />
  </svg>
);
