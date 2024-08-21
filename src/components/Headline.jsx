import React from "react";

export default function Headline({ className, children }) {
  return (
    <h1 className={`xl:text-4xl  md:text-3xl text-xl uppercase ${className}`}>
      {children}
    </h1>
  );
}
